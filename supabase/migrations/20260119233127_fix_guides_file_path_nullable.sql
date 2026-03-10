/*
  # Fix guides table file_path to be nullable
  
  1. Schema Changes
    - Alter `guides.file_path` to allow NULL values
    - This allows creating guides without PDFs initially
    - Admins can upload PDFs later via the admin panel
  
  2. Data Updates
    - Update seed data for p2p and earn guides
    - Set both to published=true
    - Set file_path=null initially (will be uploaded via admin panel)
  
  IMPORTANT: Guides can now be created without PDFs and PDFs added later
*/

-- Make file_path nullable in guides table
ALTER TABLE public.guides 
ALTER COLUMN file_path DROP NOT NULL;

-- Update existing seed data to have consistent initial state
UPDATE public.guides 
SET 
  file_path = NULL,
  is_published = true
WHERE slug IN ('p2p', 'earn');

-- Ensure seed data exists
INSERT INTO public.guides (slug, title, description, file_path, is_published)
VALUES 
  ('p2p', 'Guía P2P de Bybit', 'Aprende a usar el comercio P2P en Bybit de forma segura y eficiente', NULL, true),
  ('earn', 'Guía Bybit Earn', 'Descubre cómo generar ingresos pasivos con Bybit Earn', NULL, true)
ON CONFLICT (slug) 
DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  file_path = NULL,
  is_published = true;