/*
  # Create learning records table

  1. New Tables
    - `learning_records_69564`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `user_id` (uuid, not null, foreign key to users_69564)
      - `pinyin_type` (text, not null) - 'consonant' or 'vowel'
      - `pinyin_char` (text, not null)
      - `status` (text, not null, default 'locked') - 'locked', 'learning', 'completed'
      - `learned_at` (timestamptz)
      - `practice_count` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Indexes
    - Index on user_id for faster lookups by user
    - Index on pinyin_type for filtering by type
    - Index on status for filtering by learning status
*/

CREATE TABLE IF NOT EXISTS learning_records_69564 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users_69564(id) ON DELETE CASCADE,
  pinyin_type text NOT NULL,
  pinyin_char text NOT NULL,
  status text NOT NULL DEFAULT 'locked',
  learned_at timestamptz,
  practice_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_learning_user_id ON learning_records_69564(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_type ON learning_records_69564(pinyin_type);
CREATE INDEX IF NOT EXISTS idx_learning_status ON learning_records_69564(status);