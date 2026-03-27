/*
  # Create parent-child binding table

  1. New Tables
    - `parent_child_binding_69564`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `parent_id` (uuid, not null, foreign key to users_69564)
      - `child_id` (uuid, not null, foreign key to users_69564)
      - `binding_code` (text, unique)
      - `status` (text, not null, default 'active') - 'active', 'inactive'
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Indexes
    - Index on parent_id for faster lookups by parent
    - Index on child_id for faster lookups by child
    - Unique index on binding_code
*/

CREATE TABLE IF NOT EXISTS parent_child_binding_69564 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users_69564(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES users_69564(id) ON DELETE CASCADE,
  binding_code text UNIQUE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_binding_parent ON parent_child_binding_69564(parent_id);
CREATE INDEX IF NOT EXISTS idx_binding_child ON parent_child_binding_69564(child_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_binding_code ON parent_child_binding_69564(binding_code);