import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Beat } from '@/types';

import getBeats from './getBeats';

const getBeatsByTitle = async (title: string): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allBeats = await getBeats();
    return allBeats;
  }

  const { data, error } = await supabase
    .from('beats')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getBeatsByTitle;
