'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Beat } from '@/types';
import { useUser } from '@/hooks/useUser';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import AddToCartButton from '@/components/AddToCartButton';

interface FavoriteContentProps {
  beats: Beat[];
}

const FavoriteContent: React.FC<FavoriteContentProps> = ({ beats }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(beats);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (beats.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {beats.map((beat: any) => (
        <div key={beat.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={beat} />
          </div>
          <LikeButton beatId={beat.id} />
          <AddToCartButton beat={beat} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteContent;
