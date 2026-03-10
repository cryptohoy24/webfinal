/*
  # Create users_profile table and guides management system
  
  1. New Tables
    - `users_profile`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `role` (text, default 'user')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `guides`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `file_path` (text)
      - `is_published` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - users_profile: Users can read own profile, admins can manage all
    - guides: Authenticated users can read published guides, only admins can write
  
  3. Functions
    - `is_admin(user_id)` - Check if user has admin role
    - Trigger to auto-update `updated_at` timestamp
  
  4. Initial Data
    - Set cryptohoy24@gmail.com as admin
    - Create initial guide entries for p2p and earn
*/

-- Create users_profile table
CREATE TABLE IF NOT EXISTS public.users_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create guides table
CREATE TABLE IF NOT EXISTS public.guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.users_profile 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_profile_updated_at ON public.users_profile;
CREATE TRIGGER update_users_profile_updated_at
  BEFORE UPDATE ON public.users_profile
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_guides_updated_at ON public.guides;
CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for users_profile

CREATE POLICY "Users can read own profile"
  ON public.users_profile
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users_profile
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users_profile
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.users_profile
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles"
  ON public.users_profile
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policies for guides

CREATE POLICY "Authenticated users can read published guides"
  ON public.guides
  FOR SELECT
  TO authenticated
  USING (is_published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert guides"
  ON public.guides
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update guides"
  ON public.guides
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete guides"
  ON public.guides
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Set admin user (cryptohoy24@gmail.com)
-- First, find the user ID from auth.users
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'cryptohoy24@gmail.com'
  LIMIT 1;
  
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.users_profile (id, email, role)
    VALUES (admin_user_id, 'cryptohoy24@gmail.com', 'admin')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin', email = 'cryptohoy24@gmail.com';
  END IF;
END $$;

-- Insert initial guide entries
INSERT INTO public.guides (slug, title, description, file_path, is_published)
VALUES 
  ('p2p', 'Guía P2P de Bybit', 'Aprende a usar el comercio P2P en Bybit de forma segura y eficiente', 'guides/p2p.pdf', true),
  ('earn', 'Guía Bybit Earn', 'Descubre cómo generar ingresos pasivos con Bybit Earn', 'guides/earn.pdf', false)
ON CONFLICT (slug) DO NOTHING;
