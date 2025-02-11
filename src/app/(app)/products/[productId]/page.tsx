'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: { currency: string; amount: number };
  images: string[];
  description: string;
};

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      fetch(`/api/products/${params.productId}`)
        .then(res => res.json())
        .then(data => setProduct(data['data']))
        .catch(error => console.error('Error fetching product:', error));
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [params.id, product]);

  const addToCart = (productId: number) => {
    const updatedCart = { ...cart, [productId]: (cart[productId] || 0) + 1 };
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setAddedProduct(true);
    setTimeout(() => setAddedProduct(false), 1000);
  };

  if (!product) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  return (
    <div className='container mx-auto p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-3xl mx-auto'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>{product.name}</CardTitle>
            <Carousel className='w-full h-56 rounded-t-lg overflow-hidden'>
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} Slide ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              ))}
            </Carousel>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500 text-lg'>
                {product.price.currency} {product.price.amount.toFixed(2)}
              </p>
              <p className='text-gray-400 text-sm'>Free Shipping</p>
            </div>
            <p className='mt-4 text-gray-700'>{product.description}</p>
            <div className='flex justify-between items-center mt-6'>
              <Button
                variant='outline'
                onClick={() => addToCart(product.id)}
                className='w-full bg-blue-600 text-white hover:bg-blue-700'
              >
                {cart[product.id] ? `Added to Cart (${cart[product.id]})` : 'Add to Cart'}
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/products')}
                className='w-full bg-gray-600 text-white hover:bg-gray-700'
              >
                Back to Products
              </Button>
            </div>
            {addedProduct && <p className='text-green-500 mt-2 text-center'>Added to Cart!</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
