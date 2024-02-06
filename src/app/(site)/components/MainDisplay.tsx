'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Beat } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import BigBeatDisplay from './BigBeatDisplay';

interface MainDisplayProps {
  beats: Beat[];
}

const MainDisplay: React.FC<MainDisplayProps> = ({ beats }) => {
  const onPlay = useOnPlay(beats);

  if (beats.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className=" w-full h-1/3 p-10">
      <Carousel
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {beats.map((beat) => (
            <CarouselItem key={beat.id}>
              <BigBeatDisplay
                beat={beat}
                onClick={(id: string) => onPlay(id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MainDisplay;
