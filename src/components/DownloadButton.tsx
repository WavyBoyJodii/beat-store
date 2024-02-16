import useLoadBeatUrl from '@/hooks/useLoadBeatUrl';
import { Beat } from '@/types';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

export const DownloadButton = ({ beat }: { beat: Beat }) => {
  const beatUrl = useLoadBeatUrl(beat!);

  const download = () => {
    // Create an anchor element
    const a = document.createElement('a');
    a.href = beatUrl;
    a.download = beat.title; // Set the desired file name
    document.body.appendChild(a);

    // Trigger a click on the anchor element to initiate the download
    a.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(a);
  };

  return (
    <Button onClick={download}>
      <Download />
    </Button>
  );
};
