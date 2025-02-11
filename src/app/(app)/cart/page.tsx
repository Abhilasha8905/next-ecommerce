'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Carousel } from '~/src/components/ui/carousel';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string;
  description: string;
};

type CartItem = Product & { quantity: number };

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [details, setDetails] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async (cartItems: { [key: number]: number }) => {
    try {
      const productDetails = await Promise.all(
        Object.entries(cartItems).map(async ([id, quantity]) => {
          try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch product with ID ${id}`);
            }
            const product = await response.json();
            if (!product || !product.data) {
              throw new Error(`Product data is missing for ID ${id}`);
            }
            return { ...product.data, quantity };
          } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return null;
          }
        }),
      );

      const filteredProductDetails = productDetails.filter(item => item !== null);
      setDetails(filteredProductDetails as CartItem[]);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart || {});
        fetchProductDetails(parsedCart || {});
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error parsing cart data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      fetchProductDetails(cart);
    }
  }, [cart]);

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] = Math.max(1, quantity); // Ensure quantity is at least 1
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  if (loading) {
    return <p className='text-gray-500'>Loading...</p>;
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p className='text-gray-500'>Your cart is empty.</p>
      ) : (
        details.map((item: CartItem) => (
          <Card key={item.id} className='shadow-lg mb-4'>
            <CardHeader className='p-4 flex items-center gap-4'>
              <Carousel className='w-full h-56 rounded-t-lg overflow-hidden'>
                {item?.images?.map((image, index) => (
                  <img key={index} src={image} alt={`${item.name} Slide ${index + 1}`} className='w-full h-full object-cover' />
                ))}
              </Carousel>
              <CardTitle className='text-lg font-semibold'>{item.name}</CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
              <p className='text-gray-500 text-sm mb-4'>
                {item.price.currency} {item.price.amount.toFixed(2)}
              </p>{' '}
              <div className='flex items-center gap-4 mt-2'>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className='bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out'
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className='bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out'
                >
                  +
                </Button>
              </div>
              <Button
                variant='destructive'
                onClick={() => removeFromCart(item.id)}
                className='mt-4 bg-red-600 hover:bg-red-700 text-white'
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
      <div className='flex justify-between mt-6'>
        <Button onClick={() => router.push('/products')} className='w-full bg-blue-600 text-white hover:bg-blue-700 m-2'>
          Continue Shopping
        </Button>
        {Object.keys(cart).length > 0 && (
          <Button onClick={() => router.push('/checkout')} className='w-full bg-green-600 text-white hover:bg-green-700 m-2'>
            Proceed to Checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
