'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type CheckoutForm = {
  name: string;
  email: string;
  address: string;
};

type Product = {
  [x: string]: number;
  id: number;
  name: string;
  price: { amount: number; currency: string };
  image: string;
  description: string;
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [cart, setCart] = useState<any>({});
  const [calculatedCart, setCalculatedCart] = useState<any>({});
  const [form, setForm] = useState<CheckoutForm>({ name: '', email: '', address: '' });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch product details based on the ids and quantities stored in localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      fetchProductDetails(parsedCart || {});
    }
  }, []);

  // Fetch details for each product in the cart
  const fetchProductDetails = async (cartItems: { [key: number]: number }) => {
    try {
      const productDetails = await Promise.all(
        Object.entries(cartItems).map(async ([id, quantity]) => {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${id}`);
          }
          const product = await response.json();
          return { ...product.data, quantity };
        }),
      );

      // Update calculated cart state with product details
      const updatedCart = productDetails.reduce((acc: { [key: number]: Product }, item: Product) => {
        if (item?.id) {
          acc[item.id] = item;
        }
        return acc;
      }, {});

      setCalculatedCart(updatedCart);
      calculateTotal(updatedCart); // Calculate the total price
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems: { [key: number]: Product }) => {
    const total = Object.values(cartItems).reduce((sum, item: Product) => {
      // Ensure item.quantity and item.price are numbers
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price.amount) || 0;

      return sum + quantity * price;
    }, 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      user: form, // Use billing information from UI
      products: Object.values(calculatedCart).map((item: Product) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        images: [item.image],
        categories: [],
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the order');
      }

      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      setCart({});
      setCalculatedCart({});
      router.push('/orders');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an issue placing your order. Please try again later.');
    }
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-8 text-center text-indigo-600'>Checkout</h1>
      {Object.keys(calculatedCart).length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <>
          <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <div className='space-y-4'>
              {Object.values(calculatedCart).map((item: Product) => (
                <Card key={item.id} className='shadow-lg mb-4'>
                  <CardHeader>
                    <CardTitle className='text-lg font-medium text-indigo-800'>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center space-x-4'>
                      <div>
                        <p className='text-gray-700'>Quantity: {item.quantity}</p>
                        <p className='text-gray-700'>
                          Price: {item.price.currency} {item.price.amount.toFixed(2)}{' '}
                        </p>
                        <p className='text-gray-700'>
                          Total: {item.price.currency} {(item.quantity * item.price.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className='font-semibold text-lg pt-5'>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Billing Information</h2>
            <div className='space-y-4'>
              <input
                name='name'
                placeholder='Full Name'
                value={form.name}
                onChange={handleInputChange}
                className='border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <input
                name='email'
                type='email'
                placeholder='Email'
                value={form.email}
                onChange={handleInputChange}
                className='border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <input
                name='address'
                placeholder='Shipping Address'
                value={form.address}
                onChange={handleInputChange}
                className='border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <Button
                type='submit'
                className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
              >
                Place Order
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
