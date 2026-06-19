CREATE TABLE IF NOT EXISTS showcase_votes (
  target_id TEXT NOT NULL,
  voter_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (target_id, voter_hash)
);

CREATE INDEX IF NOT EXISTS idx_showcase_votes_target_id ON showcase_votes (target_id);

CREATE TABLE IF NOT EXISTS vote_rate_limits (
  voter_hash TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL
);
