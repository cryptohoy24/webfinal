import { supabase } from './supabase';

export async function checkIsAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users_profile')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    return data.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function ensureUserProfile(userId: string, email: string) {
  try {
    const { error } = await supabase
      .from('users_profile')
      .upsert(
        {
          id: userId,
          email: email,
          role: 'user'
        },
        {
          onConflict: 'id',
          ignoreDuplicates: false
        }
      );

    if (error) {
      console.error('Error upserting user profile:', error);
    }
  } catch (error) {
    console.error('Error in ensureUserProfile:', error);
  }
}
