/*
  # Setup Storage bucket for guides
  
  1. Storage Bucket
    - Create 'guides' bucket (private)
    - Configure file size and type restrictions
  
  2. Storage Policies
    - Read: Only authenticated users
    - Write: Only admin users
*/

-- Create guides storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'guides',
  'guides',
  false,
  20971520, -- 20MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE
SET 
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY['application/pdf'];

-- Storage policies for guides bucket

-- Allow authenticated users to read files
DROP POLICY IF EXISTS "Authenticated users can read guides" ON storage.objects;
CREATE POLICY "Authenticated users can read guides"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'guides');

-- Allow admins to insert files
DROP POLICY IF EXISTS "Admins can upload guides" ON storage.objects;
CREATE POLICY "Admins can upload guides"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'guides' 
    AND public.is_admin(auth.uid())
  );

-- Allow admins to update files
DROP POLICY IF EXISTS "Admins can update guides" ON storage.objects;
CREATE POLICY "Admins can update guides"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'guides' 
    AND public.is_admin(auth.uid())
  )
  WITH CHECK (
    bucket_id = 'guides' 
    AND public.is_admin(auth.uid())
  );

-- Allow admins to delete files
DROP POLICY IF EXISTS "Admins can delete guides" ON storage.objects;
CREATE POLICY "Admins can delete guides"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'guides' 
    AND public.is_admin(auth.uid())
  );
