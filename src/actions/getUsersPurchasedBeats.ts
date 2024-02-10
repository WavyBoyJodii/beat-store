import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Beat } from '@/types';

const getUsersPurchasedBeats = async (userId: string): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from('purchased_beats')
    .select('*, beats(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }
  if (!data) return [];

  return data.map((item) => ({
    ...item.beats,
  }));
};

export default getUsersPurchasedBeats;
