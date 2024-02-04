import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Beat } from '@/types';

const getBeats = async (): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from('beats')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getBeats;
