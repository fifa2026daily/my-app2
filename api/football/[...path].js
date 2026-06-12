// Vercel serverless proxy for football-data.org
// Forwards /api/football/* → https://api.football-data.org/v4/*
// with the auth token attached server-side (avoids CORS)

export default async function handler(req, res) {
  const pathParts = req.query.path || [];
  const apiPath   = Array.isArray(pathParts) ? pathParts.join("/") : pathParts;

  // Preserve any query params (e.g. ?limit=20)
  const { path: _, ...queryParams } = req.query;
  const qs = new URLSearchParams(queryParams).toString();
  const url = `https://api.football-data.org/v4/${apiPath}${qs ? "?" + qs : ""}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        "X-Auth-Token": process.env.VITE_FOOTBALL_API_TOKEN || "",
      },
    });

    const data = await upstream.json();

    // Pass CORS headers so browser is happy
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
