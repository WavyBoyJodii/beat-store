import { Beat } from '@/types';

import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (beats: Beat[]) => {
  const player = usePlayer();

  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(beats.map((beat) => beat.id));
  };

  return onPlay;
};

export default useOnPlay;
