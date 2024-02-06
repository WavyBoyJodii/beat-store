'use client';

import { Beat } from '@/types';
import { FilePlus2, ListMusic } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useOnPlay from '@/hooks/useOnPlay';
import MediaItem from './MediaItem';
import useUploadModal from '@/hooks/useUploadModal';
import ListItem from './ListItem';

interface LibraryProps {
  // recentlyPlayed: Beat[];
  recentlyPlayed: string;
}

const Library: React.FC<LibraryProps> = ({ recentlyPlayed }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  // const onPlay = useOnPlay(recentlyPlayed);
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic className=" text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <FilePlus2
          onClick={onClick}
          size={20}
          className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
          "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        <ListItem name="Favorites" image="/images/star.jpg" href="favorites" />
        {/* {recentlyPlayed.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Library;
