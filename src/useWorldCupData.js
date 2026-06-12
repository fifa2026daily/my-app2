// useWorldCupData.js
// Fetches live FIFA World Cup 2026 data from football-data.org
// Free tier: 10 requests/min — we cache for 5 minutes to stay well within limits

import { useState, useEffect } from "react";

const API_TOKEN = import.meta.env.VITE_FOOTBALL_API_TOKEN;
const BASE_URL = "/api/football"; // proxied via vite.config.js to avoid CORS
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const cache = {};

async function fetchWithCache(url) {
  const now = Date.now();
  if (cache[url] && now - cache[url].ts < CACHE_DURATION) return cache[url].data;
  const res = await fetch(url, { headers: { "X-Auth-Token": API_TOKEN } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  cache[url] = { data, ts: now };
  return data;
}

// Known API name → our name mappings (football-data.org uses different names)
const API_NAME_MAP = {
  "south korea":          "korea republic",
  "republic of korea":    "korea republic",
  "korea, republic of":   "korea republic",
  "dr congo":             "dr congo",
  "congo dr":             "dr congo",
  "democratic republic of congo": "dr congo",
  "ivory coast":          "côte d\'ivoire",
  "cote d\'ivoire":       "côte d\'ivoire",
  "bosnia and herzegovina": "bosnia-herz.",
  "bosnia & herzegovina": "bosnia-herz.",
  "bosnia-herzegovina":   "bosnia-herz.",
  "turkiye":              "türkiye",
  "turkey":               "türkiye",
  "curacao":              "curaçao",
  "cape verde islands":   "cape verde",
};

function normalize(name) {
  if (!name) return "";
  const n = name.toLowerCase().trim();
  return API_NAME_MAP[n] || n;
}

// Strict name match — no first-word shortcuts to avoid "South Korea" ↔ "South Africa"
function nameMatch(apiName, ourName) {
  if (!apiName || !ourName) return false;
  const a = normalize(apiName);
  const b = normalize(ourName);
  return a === b || a.includes(b) || b.includes(a);
}

// Compute standings from finished match results — instant, no API lag
function computeStandingsFromMatches(apiMatches, GROUPS) {
  const standMap = {};
  for (const grp of GROUPS) {
    standMap[grp.id] = grp.teams.map(t => ({
      name: t.name,
      played: 0, won: 0, draw: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
    }));
  }

  for (const m of apiMatches) {
    if (m.status !== "FINISHED") continue;
    const s = m.score?.fullTime;
    if (s?.home == null || s?.away == null) continue;

    const groupLetter = m.group?.replace("GROUP_", "") || "";
    const grpStand = standMap[groupLetter];
    if (!grpStand) continue;

    const homeRow = grpStand.find(r =>
      nameMatch(m.homeTeam?.name, r.name) || nameMatch(m.homeTeam?.shortName, r.name));
    const awayRow = grpStand.find(r =>
      nameMatch(m.awayTeam?.name, r.name) || nameMatch(m.awayTeam?.shortName, r.name));
    if (!homeRow || !awayRow) continue;

    homeRow.played++; awayRow.played++;
    homeRow.goalsFor    += s.home; homeRow.goalsAgainst += s.away;
    awayRow.goalsFor    += s.away; awayRow.goalsAgainst += s.home;
    homeRow.goalDiff = homeRow.goalsFor - homeRow.goalsAgainst;
    awayRow.goalDiff = awayRow.goalsFor - awayRow.goalsAgainst;

    if (s.home > s.away) {
      homeRow.won++; homeRow.points += 3; awayRow.lost++;
    } else if (s.home < s.away) {
      awayRow.won++; awayRow.points += 3; homeRow.lost++;
    } else {
      homeRow.draw++; homeRow.points++;
      awayRow.draw++; awayRow.points++;
    }
  }

  for (const id of Object.keys(standMap)) {
    standMap[id].sort((a, b) =>
      b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor
    );
  }
  return standMap;
}

export function useWorldCupData(GROUPS = []) {
  const [matches,     setMatches]     = useState([]);
  const [standings,   setStandings]   = useState({});
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function load() {
    try {
      setLoading(true); setError(null);
      const matchData  = await fetchWithCache(`${BASE_URL}/competitions/WC/matches`);
      const apiMatches = matchData.matches || [];
      setMatches(apiMatches);
      if (GROUPS.length > 0) setStandings(computeStandingsFromMatches(apiMatches, GROUPS));
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, CACHE_DURATION);
    return () => clearInterval(id);
  }, []);

  function getScore(homeTeam, awayTeam) {
    const m = matches.find(m =>
      (nameMatch(m.homeTeam?.name, homeTeam) || nameMatch(m.homeTeam?.shortName, homeTeam)) &&
      (nameMatch(m.awayTeam?.name, awayTeam) || nameMatch(m.awayTeam?.shortName, awayTeam))
    );
    if (!m || m.status === "TIMED" || m.status === "SCHEDULED") return null;
    const s = m.score || {};
    const home = s.fullTime?.home ?? s.halfTime?.home ?? null;
    const away = s.fullTime?.away ?? s.halfTime?.away ?? null;
    return { home, away, status: m.status, minute: m.minute || null };
  }

  return { matches, standings, loading, error, lastUpdated, getScore, reload: load };
}
