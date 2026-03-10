/*
  # Fix RLS Performance and Security Issues
  
  1. Performance Improvements
    - Replace `auth.uid()` with `(select auth.uid())` in all RLS policies
    - This prevents re-evaluation for each row, improving query performance at scale
  
  2. Security Improvements
    - Set explicit search_path for all functions to prevent search_path hijacking
    - Consolidate duplicate permissive policies
  
  3. Policy Changes
    - Drop old policies with suboptimal performance
    - Recreate with optimized patterns
    - Remove duplicate policies (read_own_profile, etc.)
*/

-- Drop all existing RLS policies for users_profile
DROP POLICY IF EXISTS "read_own_profile" ON public.users_profile;
DROP POLICY IF EXISTS "Users can read own profile" ON public.users_profile;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users_profile;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users_profile;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.users_profile;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.users_profile;

-- Drop all existing RLS policies for guides
DROP POLICY IF EXISTS "Authenticated users can read published guides" ON public.guides;
DROP POLICY IF EXISTS "Admins can insert guides" ON public.guides;
DROP POLICY IF EXISTS "Admins can update guides" ON public.guides;
DROP POLICY IF EXISTS "Admins can delete guides" ON public.guides;

-- Fix is_admin function with explicit search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.users_profile 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Fix update_updated_at_column function with explicit search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop set_updated_at if it exists (not used in our schema)
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;

-- Create optimized RLS policies for users_profile

CREATE POLICY "Users can read own profile"
  ON public.users_profile
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id OR public.is_admin((select auth.uid())));

CREATE POLICY "Users can insert own profile"
  ON public.users_profile
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON public.users_profile
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id OR public.is_admin((select auth.uid())))
  WITH CHECK ((select auth.uid()) = id OR public.is_admin((select auth.uid())));

-- Create optimized RLS policies for guides

CREATE POLICY "Authenticated users can read published guides"
  ON public.guides
  FOR SELECT
  TO authenticated
  USING (is_published = true OR public.is_admin((select auth.uid())));

CREATE POLICY "Admins can insert guides"
  ON public.guides
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin((select auth.uid())));

CREATE POLICY "Admins can update guides"
  ON public.guides
  FOR UPDATE
  TO authenticated
  USING (public.is_admin((select auth.uid())))
  WITH CHECK (public.is_admin((select auth.uid())));

CREATE POLICY "Admins can delete guides"
  ON public.guides
  FOR DELETE
  TO authenticated
  USING (public.is_admin((select auth.uid())));

-- Update storage policies with optimized patterns
DROP POLICY IF EXISTS "Authenticated users can read guides" ON storage.objects;
CREATE POLICY "Authenticated users can read guides"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'guides');

DROP POLICY IF EXISTS "Admins can upload guides" ON storage.objects;
CREATE POLICY "Admins can upload guides"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'guides' 
    AND public.is_admin((select auth.uid()))
  );

DROP POLICY IF EXISTS "Admins can update guides" ON storage.objects;
CREATE POLICY "Admins can update guides"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'guides' 
    AND public.is_admin((select auth.uid()))
  )
  WITH CHECK (
    bucket_id = 'guides' 
    AND public.is_admin((select auth.uid()))
  );

DROP POLICY IF EXISTS "Admins can delete guides" ON storage.objects;
CREATE POLICY "Admins can delete guides"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'guides' 
    AND public.is_admin((select auth.uid()))
  );
