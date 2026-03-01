-- user_chapter_progress: chapter-wise percentage (0-100)
-- Use progress_percentage for compatibility with existing code; store integer 0-100.
CREATE TABLE IF NOT EXISTS user_chapter_progress (
  user_id INT NOT NULL,
  chapter_key TEXT NOT NULL,
  progress_percentage INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, chapter_key)
);

-- user_overall_progress: single row per user, total course percentage (0-100)
CREATE TABLE IF NOT EXISTS user_overall_progress (
  user_id INT PRIMARY KEY,
  total_progress_percent INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
