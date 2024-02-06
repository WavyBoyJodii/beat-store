'use client';

import { Beat } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from '@/components/PlayButton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface BigBeatDisplayProps {
  beat: Beat;
  onClick: (id: string) => void;
}

const BigBeatDisplay: React.FC<BigBeatDisplayProps> = ({ beat, onClick }) => {
  const imagePath = useLoadImage(beat);

  return (
    <div className=" flex bg-black h-96 w-full rounded-xl gap-10">
      <div className=" flex h-full w-full p-8 justify-center place-self-center items-center">
        <PlayButton onClick={() => onClick(beat.id)} />
        <div className=" flex flex-col gap-3 w-full">
          <h1 className=" text-2xl truncate">{beat.title}</h1>
          <p className=" text-s text-neutral-400">{beat.producer}</p>
        </div>
      </div>
      <div className="relative aspect-square w-full  h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || '/images/music-placeholder.png'}
          fill
          alt="Image"
        />
      </div>
      <div className=" flex justify-center h-full w-full items-center">
        <Button className="" variant={'default'}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default BigBeatDisplay;
