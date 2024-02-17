import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Beat } from '@/types';

const getLatestFiveBeats = async (): Promise<Beat[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from('beats')
    .select('*, prices(*, products(*))')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getLatestFiveBeats;
