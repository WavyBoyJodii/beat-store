'use client';

import { Beat } from '@/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import AddToCartButton from '@/components/AddToCartButton';

interface SearchContentProps {
  beats: Beat[];
}

const SearchContent: React.FC<SearchContentProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {beats.map((beat: Beat) => (
        <div key={beat.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={beat} />
          </div>
          <LikeButton beatId={beat.id} />
          <AddToCartButton beat={beat} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
