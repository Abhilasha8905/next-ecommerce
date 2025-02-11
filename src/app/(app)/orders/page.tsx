'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { getOrders } from '~/src/lib/utils';

type OrderItem = {
  id: string;
  referenceId: string;
  type: string;
  price: {
    amount: number;
    currency: string;
  };
  quantity: number;
};

type Order = {
  id: string;
  status: string;
  user: {
    id: string;
    name: string;
  };
  cart: {
    tax: number;
    items: OrderItem[];
    subtotal: { amount: number; currency: string };
    total: { amount: number; currency: string };
  };
  timestamp: string;
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders);
      } catch (error) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Order History</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto p-6 text-center'>
        <h1 className='text-2xl font-bold mb-4'>Order History</h1>
        <p className='text-red-500'>{error}</p>
        <Button variant='outline' onClick={() => router.push('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Order History</h1>
      {orders.length === 0 ? (
        <p className='text-gray-500 text-center'>No past orders found.</p>
      ) : (
        <div className='space-y-6'>
          {orders.map(order => (
            <Card key={order.id} className='shadow-lg mb-4 hover:shadow-xl transition duration-300'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  Order #{order.id.slice(-6)} - {order.status}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 mb-2'>
                  <strong>Placed by:</strong> {order.user.name}
                </p>
                <p className='text-gray-600 mb-2'>
                  <strong>Date:</strong> {new Date(order.timestamp).toLocaleDateString()}
                </p>
                <p className='text-gray-600 mb-2'>
                  <strong>Subtotal:</strong> {order.cart.subtotal.amount.toFixed(2)} {order.cart.subtotal.currency}
                </p>
                <p className='text-gray-700 font-bold mb-2'>
                  <strong>Total:</strong> {order.cart.total.amount.toFixed(2)} {order.cart.total.currency}
                </p>
                <h3 className='text-gray-800 font-medium mt-4'>Items:</h3>
                <ul className='mt-2 text-gray-700 space-y-1'>
                  {order.cart.items.map(item => (
                    <li key={item.id}>
                      {item.quantity}x Item #{item.referenceId} - {item.price.amount.toFixed(2)} {item.price.currency}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className='flex justify-center mt-6'>
        <Button variant='outline' onClick={() => router.push('/products')}>
          Back to Products
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;
