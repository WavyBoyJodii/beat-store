import { Beat } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getFavoriteBeats = async (): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('favorites')
    .select('*, beats(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.beats,
  }));
};

export default getFavoriteBeats;
