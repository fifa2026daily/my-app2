// useWorldCupData.js
// Fetches live FIFA World Cup 2026 data from football-data.org
// Free tier: 10 requests/min — we cache for 5 minutes to stay well within limits

const API_TOKEN = import.meta.env.VITE_FOOTBALL_API_TOKEN;
const BASE_URL = "https://api.football-data.org/v4";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = {};

async function fetchWithCache(url) {
  const now = Date.now();
  if (cache[url] && now - cache[url].ts < CACHE_DURATION) {
    return cache[url].data;
  }
  const res = await fetch(url, {
    headers: { "X-Auth-Token": API_TOKEN },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  cache[url] = { data, ts: now };
  return data;
}

import { useState, useEffect } from "react";

// Returns { matches, standings, loading, error, lastUpdated }
export function useWorldCupData() {
  const [matches,      setMatches]      = useState([]);
  const [standings,    setStandings]    = useState({});
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [lastUpdated,  setLastUpdated]  = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const [matchData, standData] = await Promise.all([
        fetchWithCache(`${BASE_URL}/competitions/WC/matches`),
        fetchWithCache(`${BASE_URL}/competitions/WC/standings`),
      ]);

      setMatches(matchData.matches || []);

      // Build standings map: groupId → array of team standings
      const standMap = {};
      for (const grp of (standData.standings || [])) {
        if (grp.type === "TOTAL") {
          const letter = grp.group?.replace("GROUP_", "") || "";
          standMap[letter] = grp.table.map(row => ({
            name:     row.team.name,
            played:   row.playedGames,
            won:      row.won,
            draw:     row.draw,
            lost:     row.lost,
            goalsFor: row.goalsFor,
            goalsAgainst: row.goalsAgainst,
            goalDiff: row.goalDifference,
            points:   row.points,
          }));
        }
      }
      setStandings(standMap);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // Refresh every 5 minutes
    const id = setInterval(load, CACHE_DURATION);
    return () => clearInterval(id);
  }, []);

  // Helper: find score for a match by home+away team name
  function getScore(homeTeam, awayTeam) {
    const m = matches.find(
      m =>
        m.homeTeam?.name?.includes(homeTeam) ||
        homeTeam?.includes(m.homeTeam?.shortName || "___")
    );
    if (!m || m.status === "TIMED" || m.status === "SCHEDULED") return null;
    return {
      home:   m.score?.fullTime?.home ?? null,
      away:   m.score?.fullTime?.away ?? null,
      status: m.status, // FINISHED | IN_PLAY | PAUSED | HALFTIME
      minute: m.minute || null,
    };
  }

  return { matches, standings, loading, error, lastUpdated, getScore, reload: load };
}
