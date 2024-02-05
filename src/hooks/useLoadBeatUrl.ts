import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Beat } from '@/types';

const useLoadBeatUrl = (beat: Beat) => {
  const supabaseClient = useSupabaseClient();

  if (!beat) {
    return '';
  }

  const { data: beatData } = supabaseClient.storage
    .from('beats')
    .getPublicUrl(beat.beat_path);

  return beatData.publicUrl;
};

export default useLoadBeatUrl;
