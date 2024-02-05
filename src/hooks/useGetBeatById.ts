import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Beat } from '@/types';

const useGetBeatById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [beat, setBeat] = useState<Beat | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchBeat = async () => {
      const { data, error } = await supabaseClient
        .from('beats')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setBeat(data as Beat);
      setIsLoading(false);
    };

    fetchBeat();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      beat,
    }),
    [isLoading, beat]
  );
};

export default useGetBeatById;
