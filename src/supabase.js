import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Get or create a session ID for this browser ──────────────────────────────
export function getSessionId() {
  let id = localStorage.getItem("golazo_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("golazo_session", id);
  }
  return id;
}

// ── Predictions ───────────────────────────────────────────────────────────────

// Save or update a fan's prediction
export async function savePrediction({ champion, goldenBoot, finalist, groupPicks }) {
  const session_id = getSessionId();
  const { error } = await supabase
    .from("predictions")
    .upsert({
      session_id,
      champion,
      golden_boot: goldenBoot,
      finalist: finalist || null,
      group_picks: groupPicks || {},
      updated_at: new Date()
    }, { onConflict: "session_id" });
  return !error;
}

// Get prediction counts for all teams
export async function getPredictionCounts() {
  const { data, error } = await supabase
    .from("predictions")
    .select("champion");
  if (error || !data) return {};
  const counts = {};
  data.forEach(r => {
    if (r.champion) counts[r.champion] = (counts[r.champion] || 0) + 1;
  });
  return counts;
}

// Get this fan's saved prediction
export async function getMyPrediction() {
  const session_id = getSessionId();
  const { data } = await supabase
    .from("predictions")
    .select("champion, golden_boot")
    .eq("session_id", session_id)
    .single();
  return data;
}

// ── Debate Votes ──────────────────────────────────────────────────────────────

// Submit a vote (upsert — one vote per fan per debate)
export async function submitVote(debateId, side) {
  const session_id = getSessionId();
  const { error } = await supabase
    .from("debate_votes")
    .upsert({ session_id, debate_id: debateId, side },
             { onConflict: "session_id,debate_id" });
  return !error;
}

// Get vote counts for a debate: { A: 123, B: 456 }
export async function getVoteCounts(debateId) {
  const { data, error } = await supabase
    .from("debate_votes")
    .select("side")
    .eq("debate_id", debateId);
  if (error || !data) return { A: 0, B: 0 };
  return {
    A: data.filter(r => r.side === "A").length,
    B: data.filter(r => r.side === "B").length,
  };
}

// Get this fan's vote for a debate
export async function getMyVote(debateId) {
  const session_id = getSessionId();
  const { data } = await supabase
    .from("debate_votes")
    .select("side")
    .eq("session_id", session_id)
    .eq("debate_id", debateId)
    .single();
  return data?.side || null;
}
