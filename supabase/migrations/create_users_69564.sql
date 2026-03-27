/*
  # Create users table

  1. New Tables
    - `users_69564`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `email` (text, unique, not null)
      - `name` (text, not null)
      - `role` (text, not null, default 'child') - 'child' or 'parent'
      - `age` (integer)
      - `avatar_url` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Indexes
    - Index on email for faster lookups
    - Index on role for filtering users by role
*/

CREATE TABLE IF NOT EXISTS users_69564 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'child',
  age integer,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users_69564(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users_69564(role);