'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { fetchProducts } from './utils';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: { currency: string; amount: number };
  images: string[];
  rating: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: number]: number }>({}); // Cart state
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.id]) {
        updatedCart[product.id] += 1;
      } else {
        updatedCart[product.id] = 1;
      }
      console.log(updatedCart, 'updatedCart');
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleViewDetails = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const cartItemCount = Object.values(cart).reduce((total, count) => total + count, 0);
  console.log('cartItemCount', cartItemCount, cart);

  if (loading) return <div className='text-center p-8'>Loading...</div>;
  if (error) return <div className='text-center p-8 text-red-500'>{error}</div>;

  return (
    <div className='container mx-auto p-6 bg-gray-50 min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map(product => (
          <Card
            key={product.id}
            className='transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200 rounded-lg bg-white max-w-xs mx-auto'
          >
            <CardHeader className='p-0 relative'>
              <Carousel className='w-full h-56 rounded-t-lg overflow-hidden'>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} Slide ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                ))}
              </Carousel>
              <div className='absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-bl-lg'>
                {product.rating} <span className='ml-1'>★</span>
              </div>
            </CardHeader>
            <CardContent className='p-4'>
              <CardTitle className='text-lg font-semibold mb-2 text-gray-800'>{product.name}</CardTitle>
              <p className='text-gray-500 text-sm mb-2'>
                {product.price.currency} {product.price.amount.toFixed(2)}
              </p>
              <p className='text-gray-400 text-sm mb-4'>Free Shipping</p>
              <div className='flex justify-between items-center gap-2'>
                <Button
                  variant='outline'
                  onClick={() => handleViewDetails(product.id)}
                  className='w-full bg-blue-600 text-white hover:bg-blue-700'
                >
                  View Details
                </Button>
                <Button
                  variant='outline'
                  onClick={() => addToCart(product)}
                  className='w-full bg-green-600 text-white hover:bg-green-700'
                >
                  {cart[product.id] ? `Added (${cart[product.id]})` : 'Add to Cart'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full'>
        <Button onClick={() => router.push('/cart')}>Cart ({cartItemCount})</Button>
      </div>
    </div>
  );
};

export default ProductsPage;
