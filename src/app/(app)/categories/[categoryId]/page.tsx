'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const CategoryDetailsPage: React.FC = () => {
  const { categoryId } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/categories/${categoryId}`)
      .then(res => res.json())
      .then((data: { data: Category }) => {
        setCategory(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <p className='text-center text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;
  if (!category) return <p className='text-center text-gray-500'>Category not found.</p>;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='shadow-lg'>
        <CardHeader className='flex flex-col items-center text-center'>
          <img src={category.image} alt={category.name} className='w-full h-60 object-cover rounded-md mb-4' />
          <CardTitle className='text-2xl font-bold'>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-gray-600'>{category.description}</p>
          <Button onClick={() => router.push('/categories')} className='mt-6 w-full bg-blue-600 text-white hover:bg-blue-700'>
            Back to Categories
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetailsPage;
