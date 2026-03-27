/*
  # Create test scores table

  1. New Tables
    - `test_scores_69564`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `user_id` (uuid, not null, foreign key to users_69564)
      - `test_type` (text, not null) - 'consonant', 'vowel', 'comprehensive'
      - `score` (integer, not null)
      - `total_questions` (integer, not null)
      - `correct_answers` (integer, not null)
      - `duration_seconds` (integer, default 0)
      - `test_date` (timestamptz, default now())
      - `created_at` (timestamptz, default now())

  2. Indexes
    - Index on user_id for faster lookups by user
    - Index on test_date for sorting by date
    - Index on test_type for filtering by type
*/

CREATE TABLE IF NOT EXISTS test_scores_69564 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_69564(id) ON DELETE CASCADE,
  test_type text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  duration_seconds integer DEFAULT 0,
  test_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_test_user_id ON test_scores_69564(user_id);
CREATE INDEX IF NOT EXISTS idx_test_date ON test_scores_69564(test_date);
CREATE INDEX IF NOT EXISTS idx_test_type ON test_scores_69564(test_type);