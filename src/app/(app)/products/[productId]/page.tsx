'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import ProductCarousel from '~/src/components/ui/product-carousel';
import { fetchProductDetails } from '~/src/lib/utils';
import { Product } from '~/src/types/app';

const ProductDetailPage: React.FC<{ params: { productId: string } }> = ({ params: { productId } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      const loadProductDetails = async (productId: string) => {
        const products = await fetchProductDetails(productId);
        setProduct(products);
      };
      loadProductDetails(productId);
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [productId, product]);

  const addToCart = () => {
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
    <div className='flex flex-col  bg-gray-50'>
      <div className='flex-1 container mx-auto p-6'>
        <div className='max-w-3xl mx-auto'>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-semibold'>{product.name}</CardTitle>
              <div className='relative w-full max-w-lg mx-auto'>
                <ProductCarousel product={product} />
              </div>
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
                  onClick={() => addToCart()}
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
    </div>
  );
};

export default ProductDetailPage;
