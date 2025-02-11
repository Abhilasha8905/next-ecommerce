import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '~/src/types/app';

interface ProductCardProps {
  product: Product
  handleViewDetails: (productId: string) => void;
  addToCart: (product: Product) => void;
  cartItemCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, handleViewDetails, cartItemCount }) => (
  <Card className='transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200 rounded-lg bg-white'>
    <CardHeader className='p-0 relative'>
    </CardHeader>
    <CardContent className='p-4'>
      <CardTitle className='text-lg font-semibold mb-2 text-gray-800'>{product.name}</CardTitle>
      <img src={product.images[0]} alt={product.name} width={300} height={210} className='rounded-lg p-2' />
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
          {cartItemCount ? `Added (${cartItemCount})` : 'Add to Cart'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ProductCard;