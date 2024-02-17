'use client';

import { Beat } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import BeatItem from '@/components/BeatItem';

interface PageContentProps {
  beats: Beat[];
}

const PageContent: React.FC<PageContentProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">No More Beats available.</div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
    >
      {beats.map((item) => (
        <BeatItem
          onClick={(id: string) => onPlay(id)}
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};

export default PageContent;
