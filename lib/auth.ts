import { supabase } from './supabase';

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function isAdmin() {
  const session = await getSession();
  if (!session) return false;

  const { data, error } = await supabase
    .from('users_profile')
    .select('role')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return data?.role === 'admin';
}

export async function ensureUserProfile() {
  const session = await getSession();
  if (!session) return;

  // Auto-promote admin email
  const role = session.user.email === 'cryptohoy24@gmail.com' ? 'admin' : 'user';

  const { error } = await supabase
    .from('users_profile')
    .upsert(
      {
        id: session.user.id,
        email: session.user.email,
        role: role,
      },
      {
        onConflict: 'id',
        ignoreDuplicates: false
      }
    );

  if (error) {
    console.error('Error upserting user profile:', error);
  }
}
