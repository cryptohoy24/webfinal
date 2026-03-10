/*
  # Drop unused pdf_sessions table

  1. Changes
    - Drop the `pdf_sessions` table that was created for the proxy approach
    - This also removes all associated indexes:
      - idx_pdf_sessions_token
      - idx_pdf_sessions_expires_at
      - idx_pdf_sessions_user_id
    - Resolves RLS security issue (table had RLS enabled but no policies)

  2. Reason
    - The pdf_sessions table is no longer needed after switching to direct signed URLs
    - Removing unused database objects improves security and reduces maintenance
*/

DROP TABLE IF EXISTS public.pdf_sessions;