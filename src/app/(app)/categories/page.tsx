'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then((data: { data: Category[] }) => setCategories(data.data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>Product Categories</h1>
      {error ? (
        <p className='text-red-500 text-center'>{error}</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map(category => (
            <div key={category.id} className='p-4 border rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-white'>
              <img src={category.image} alt={category.name} className='rounded-md shadow-sm mb-4 w-full h-40 object-cover' />
              <h2 className='text-xl font-semibold mb-2 text-gray-800'>{category.name}</h2>
              <p className='text-gray-600 mb-4'>{category.description}</p>
              <Button
                variant='outline'
                className='w-full hover:bg-gray-100'
                onClick={() => router.push(`/categories/${category.id}`)}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
