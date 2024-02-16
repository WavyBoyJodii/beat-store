import { PlaySquare } from 'lucide-react';

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="transition flex items-center justify-center p-4 translate group-hover:opacity-100 group-hover:translate-y-0 drop-shadow-md hover:scale-110"
    >
      <PlaySquare className="text-white" size={40} />
    </button>
  );
};

export default PlayButton;
