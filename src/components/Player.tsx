'use client';

import usePlayer from '@/hooks/usePlayer';
import useLoadBeatUrl from '@/hooks/useLoadBeatUrl';
import useGetBeatById from '@/hooks/useGetBeatById';

import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { beat } = useGetBeatById(player.activeId);

  const beatUrl = useLoadBeatUrl(beat!);

  if (!beat || !beatUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
          fixed 
          bottom-0 
          bg-black 
          w-full 
          py-2 
          h-[80px] 
          px-4
        "
    >
      <PlayerContent key={beatUrl} beat={beat} beatUrl={beatUrl} />
    </div>
  );
};

export default Player;
