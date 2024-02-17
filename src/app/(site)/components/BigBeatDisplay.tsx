'use client';

import { Beat } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from '@/components/PlayButton';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import AddToCartButton from '@/components/AddToCartButton';

interface BigBeatDisplayProps {
  beat: Beat;
  onClick: (id: string) => void;
}

const BigBeatDisplay: React.FC<BigBeatDisplayProps> = ({ beat, onClick }) => {
  const imagePath = useLoadImage(beat);

  const { addItem } = useCart();
  console.log(`logging beat object ${JSON.stringify(beat)}`);
  const addBeatToCart = () => {
    addItem(beat.prices);
  };

  return (
    <div className=" flex flex-col lg:flex-row bg-black h-fit lg:h-96 w-full rounded-xl gap-10">
      <div className=" flex h-44 lg:h-full w-fit lg:w-full p-4 lg:p-8 justify-center place-self-center items-center">
        <PlayButton onClick={() => onClick(beat.id)} />
        <div className=" flex flex-col gap-3 w-auto lg:w-full">
          <h1 className=" text-2xl truncate">{beat.title}</h1>
          <p className=" text-s text-neutral-400">{beat.producer}</p>
        </div>
      </div>
      <div className="relative aspect-square lg:w-full h-80 lg:h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || '/images/music-placeholder.png'}
          fill
          alt="Image"
        />
      </div>
      <div className=" flex justify-center h-44 lg:h-full w-full items-center">
        <AddToCartButton beat={beat} />
      </div>
    </div>
  );
};

export default BigBeatDisplay;
