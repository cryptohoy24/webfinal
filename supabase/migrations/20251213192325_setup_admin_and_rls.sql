/*
  # Setup Admin System and Secure RLS Policies

  ## Summary
  This migration establishes a secure admin system and comprehensive Row Level Security
  policies for the users_profile table. It ensures data isolation for regular users
  while granting administrative access to designated admins.

  ## 1. New Tables
    - `admin_users`
      - `user_id` (uuid, primary key, references auth.users)
      - `email` (text, for reference)
      - `created_at` (timestamptz, default now())

  ## 2. Security Policies
    ### For users_profile table:
    - **INSERT policy**: Authenticated users can insert only their own profile
    - **SELECT policy**: Authenticated users can view only their own profile
    - **UPDATE policy**: Authenticated users can update only their own profile
    - **Admin SELECT policy**: Users in admin_users can view all profiles

  ## 3. Admin Setup
    - Automatically adds cryptohoy24@gmail.com to admin_users when they register
    - Uses a helper function to check admin status

  ## 4. Data Integrity
    - Indexes on frequently queried columns
    - Foreign key constraints
    - Unique constraints on email and bybit_uid (already exists)

  ## 5. Security Notes
    - RLS is enabled and restrictive by default
    - No anonymous access is permitted
    - All communication must be through authenticated users
    - Admin access is controlled via admin_users table, not environment variables
*/

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add RLS to admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin_users table
CREATE POLICY "Admins can view admin list"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- 2. Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Drop all existing policies on users_profile (if any)
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE tablename = 'users_profile' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON users_profile', pol.policyname);
  END LOOP;
END $$;

-- 4. Create new RLS policies for users_profile

-- Users can insert only their own profile
CREATE POLICY "Users can insert own profile"
  ON users_profile
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can view only their own profile
CREATE POLICY "Users can view own profile"
  ON users_profile
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update only their own profile
CREATE POLICY "Users can update own profile"
  ON users_profile
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON users_profile
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_profile_email ON users_profile(email);
CREATE INDEX IF NOT EXISTS idx_users_profile_bybit_uid ON users_profile(bybit_uid);
CREATE INDEX IF NOT EXISTS idx_users_profile_created_at ON users_profile(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 6. Function to automatically add admin users on registration
CREATE OR REPLACE FUNCTION add_admin_user_if_eligible()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email matches admin email
  IF NEW.email = 'cryptohoy24@gmail.com' THEN
    INSERT INTO admin_users (user_id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger on auth.users to auto-add admins
DROP TRIGGER IF EXISTS on_auth_user_created_add_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_add_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION add_admin_user_if_eligible();

-- 8. Add existing admin user if they already exist
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Find user ID for cryptohoy24@gmail.com
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'cryptohoy24@gmail.com'
  LIMIT 1;

  -- If found, add to admin_users
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO admin_users (user_id, email)
    VALUES (admin_user_id, 'cryptohoy24@gmail.com')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;
