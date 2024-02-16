'use client';

import { Button } from './ui/button';
import { Beat } from '@/types';
import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  beat: Beat;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ beat }) => {
  const { items, addItem } = useCart();
  console.log(`logging beat object ${JSON.stringify(beat)}`);
  const addBeatToCart = () => {
    addItem(beat.prices);
  };

  return (
    <Button className="" variant={'default'} onClick={addBeatToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
