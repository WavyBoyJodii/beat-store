import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Beat } from '@/types';

const useLoadImage = (beat: Beat) => {
  const supabaseClient = useSupabaseClient();

  if (!beat) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(beat.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
