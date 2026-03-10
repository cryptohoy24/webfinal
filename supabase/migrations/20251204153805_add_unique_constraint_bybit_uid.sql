/*
  # Add unique constraint to bybit_uid

  1. Changes
    - Add UNIQUE constraint to bybit_uid column in users_profile table
    - This prevents duplicate Bybit UIDs from being registered

  2. Notes
    - This is a data integrity improvement
    - Each Bybit UID can only be associated with one account
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'users_profile_bybit_uid_key'
  ) THEN
    ALTER TABLE users_profile 
    ADD CONSTRAINT users_profile_bybit_uid_key UNIQUE (bybit_uid);
  END IF;
END $$;
