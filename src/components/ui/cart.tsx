import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FloatingCartButtonProps {
  cartItemCount: number;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ cartItemCount }) => {
  const router = useRouter();
  const [cart, setCart] = useState( cartItemCount )

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(Object.values(JSON.parse(storedCart) as Record<string, number>)?.reduce((acc: number, curr: number) => acc + curr, 0));
    }
  }, [cartItemCount]);

  return (
    <div
      className='fixed bottom-16 right-6 flex items-center bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all cursor-pointer'
      onClick={() => router.push('/cart')}
    >
      <ShoppingCart size={24} />
      {cart > 0 && <span className='ml-2 font-semibold'>{cart}</span>}
    </div>
  );
};

export default FloatingCartButton;
