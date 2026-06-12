// Vercel serverless proxy for football-data.org
// Handles all /api/football/* routes

export default async function handler(req, res) {
  // Extract the path after /api/football/
  const fullPath = req.url; // e.g. /api/football/competitions/WC/matches?foo=bar
  const match = fullPath.match(/^\/api\/football\/(.*)$/);
  if (!match) return res.status(400).json({ error: "Bad path" });

  const pathAndQuery = match[1]; // e.g. competitions/WC/matches?foo=bar
  const url = `https://api.football-data.org/v4/${pathAndQuery}`;

  try {
    const upstream = await fetch(url, {
      headers: { "X-Auth-Token": process.env.VITE_FOOTBALL_API_TOKEN || "" },
    });
    const data = await upstream.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
