'use client';

import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSessionContext } from '@supabase/auth-helpers-react';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

interface LikeButtonProps {
  beatId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ beatId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('beat_id', beatId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [beatId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('beat_id', beatId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from('favorites').insert({
        beat_id: beatId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Success');
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
