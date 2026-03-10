/*
  # Create PDF Sessions Table for Tokenized PDF Access
  
  1. New Table
    - `pdf_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `slug` (text, the guide slug)
      - `token` (text, unique random token for URL access)
      - `expires_at` (timestamptz, short-lived token expiry)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on pdf_sessions table
    - Only the system (service role) can manage tokens
    - Users never directly access this table
  
  3. Index
    - Create unique index on token for fast lookup
    - Create index on expires_at for efficient cleanup
  
  IMPORTANT: This table enables iframe PDF previews by providing
  tokenized URLs that don't require Authorization headers.
*/

-- Create pdf_sessions table
CREATE TABLE IF NOT EXISTS public.pdf_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text NOT NULL,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pdf_sessions_token ON public.pdf_sessions(token);
CREATE INDEX IF NOT EXISTS idx_pdf_sessions_expires_at ON public.pdf_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_pdf_sessions_user_id ON public.pdf_sessions(user_id);

-- Enable RLS
ALTER TABLE public.pdf_sessions ENABLE ROW LEVEL SECURITY;

-- No policies needed - only service role accesses this table
-- This prevents any client-side access

-- Create function to cleanup expired tokens (optional, can be called periodically)
CREATE OR REPLACE FUNCTION public.cleanup_expired_pdf_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.pdf_sessions WHERE expires_at < now();
$$;