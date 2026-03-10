/*
  # Remove Auto-Admin Trigger

  ## Summary
  Removes the automatic admin assignment trigger that was preventing user creation
  for cryptohoy24@gmail.com. User signup must never fail due to admin assignment logic.

  ## Changes
    1. Drop trigger `on_auth_user_created_add_admin` from auth.users
    2. Drop function `add_admin_user_if_eligible()`
    3. Keep all RLS policies intact and secure

  ## After This Migration
    - cryptohoy24@gmail.com can sign up normally
    - Admin must be manually added to admin_users table using:
      ```sql
      INSERT INTO admin_users (user_id, email)
      SELECT id, email FROM auth.users WHERE email = 'cryptohoy24@gmail.com';
      ```

  ## Security
    - RLS remains enabled on all tables
    - All security policies remain unchanged
    - No special treatment for any email during signup
*/

-- Drop the trigger that auto-adds admins
DROP TRIGGER IF EXISTS on_auth_user_created_add_admin ON auth.users;

-- Drop the function that checks for admin emails
DROP FUNCTION IF EXISTS add_admin_user_if_eligible();
