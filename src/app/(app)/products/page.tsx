'use client';
import React, { useState, useEffect } from 'react';


import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/ui/sidebar';
import ProductCard from '../../../components/ui/product-card';
import FloatingCartButton from '../../../components/ui/cart';
import { Button } from '~/src/components/ui/button';
import { Menu } from 'lucide-react';
import { fetchCategories, fetchProducts } from '~/src/lib/utils';
import { Product } from '~/src/types/app';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [categories, setCategories] = useState<[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(selectedCategories.join(','));
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => (prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]));
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      updatedCart[product.id] = (updatedCart[product.id] || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleViewDetails = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const cartItemCount = Object.values(cart).reduce((total, count) => total + count, 0);

  if (loading) return <div className='text-center p-8'>Loading...</div>;
  if (error) return <div className='text-center p-8 text-red-500'>{error}</div>;

  return (
    <div className='container mx-auto p-4 bg-gray-50 min-h-screen flex'>
      <Sidebar
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className='w-full md:w-3/4 p-4'>
        <div className='flex justify-between items-center mb-4 md:hidden'>
          <Button
            variant='outline'
            onClick={() => setIsSidebarOpen(true)}
            className='flex items-center bg-gray-200 text-gray-700 hover:bg-gray-300'
          >
            <Menu size={20} />
            <span className='ml-2'>Filters</span>
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              handleViewDetails={handleViewDetails}
              cartItemCount={cart[product.id] || 0}
            />
          ))}
        </div>
      </div>

      <FloatingCartButton cartItemCount={cartItemCount} />
    </div>
  );
};

export default ProductsPage;
