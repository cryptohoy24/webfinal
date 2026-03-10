/*
  # Fix RLS Recursion in admin_users Table

  ## Summary
  Fixes recursive RLS policy issues in admin_users table by refactoring
  the is_admin() function and rebuilding all RLS policies from scratch.

  ## Changes Made

  ### 1. Function Updates
  - Recreate `is_admin()` as SQL function (not plpgsql) with STABLE
  - Use SECURITY DEFINER with fixed search_path (public, pg_catalog)
  - Direct query to admin_users without recursion risk

  ### 2. RLS Policy Restructure
  - Drop all existing policies on admin_users and users_profile
  - admin_users: Users can only see their own admin row (no is_admin() call)
  - admin_users: service_role can insert new admin rows
  - users_profile: Users can select/insert/update their own profile
  - users_profile: Admins can select all profiles (safe to use is_admin())

  ## Security
  - No anonymous access to any tables
  - No recursion: admin_users policies don't call is_admin()
  - Admins verified by SECURITY DEFINER function with fixed search_path
  - All policies restricted to authenticated users
  - service_role required for admin grants

  ## Technical Details
  - STABLE function attribute for query optimization
  - search_path includes pg_catalog for system functions
  - Transaction wrapped for atomicity
*/

BEGIN;

-- 1) Create / replace admin checker function WITHOUT recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  );
$$;

-- 2) Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;

-- 3) Drop existing policies that may cause recursion
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'admin_users'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.admin_users;', pol.policyname);
  END LOOP;

  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'users_profile'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.users_profile;', pol.policyname);
  END LOOP;
END $$;

-- 4) admin_users policies:
-- Allow authenticated users to SELECT only their own admin row
CREATE POLICY admin_users_select_own
ON public.admin_users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Allow service_role to INSERT admin rows (manual granting)
CREATE POLICY admin_users_insert_service_role
ON public.admin_users
FOR INSERT
TO service_role
WITH CHECK (true);

-- 5) users_profile policies:
CREATE POLICY users_profile_select_own
ON public.users_profile
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY users_profile_insert_own
ON public.users_profile
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY users_profile_update_own
ON public.users_profile
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin can SELECT all rows
CREATE POLICY users_profile_admin_select_all
ON public.users_profile
FOR SELECT
TO authenticated
USING (public.is_admin());

COMMIT;
