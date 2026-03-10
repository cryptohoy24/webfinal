/*
  # Fix is_admin Function Search Path Security Warning

  ## Summary
  Updates the `is_admin()` function to include a fixed search_path, resolving
  the "Function Search Path Mutable" security warning in Supabase.

  ## Changes
    1. Recreate `is_admin()` function with `SET search_path = public`
    2. Maintains SECURITY DEFINER for proper auth.uid() access
    3. Keeps same behavior: checks if current user exists in admin_users table

  ## Security
    - Fixed search_path prevents potential schema manipulation attacks
    - Function behavior unchanged - still checks admin_users table
    - RLS policies remain unchanged and secure
    - SECURITY DEFINER required for auth.uid() access

  ## Technical Details
    - search_path set to 'public' schema only
    - Prevents malicious schema injection via search_path manipulation
    - Standard security best practice for SECURITY DEFINER functions
*/

-- Drop and recreate the function with fixed search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  );
END;
$$;
