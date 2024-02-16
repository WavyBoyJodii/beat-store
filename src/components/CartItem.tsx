import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Price, Product, PriceWithProduct } from '@/types';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

const CartItem = ({ product }: { product: PriceWithProduct }) => {
  const { removeItem } = useCart();

  console.log(`logging product object ${JSON.stringify(product)}`);

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <div className="flex h-full items-center justify-center bg-secondary">
              <ImageIcon
                aria-hidden="true"
                className="h-4 w-4 text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.products.name}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.unit_amount!)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
