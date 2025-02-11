'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Orders', path: '/orders' },
    { name: 'Cart', path: '/cart' },
  ];

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        {/* Header */}
        <header className='bg-white shadow-md sticky top-0 z-10'>
          <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
            <Button
              variant='link'
              onClick={() => router.push('/')}
              className='text-2xl font-bold text-gray-800 hover:text-blue-600'
            >
              E-Shop
            </Button>
            <div className='hidden md:flex space-x-6'>
              {navItems.map(({ name, path }) => (
                <Button
                  key={path}
                  variant='link'
                  onClick={() => router.push(path)}
                  className={`text-gray-600 hover:text-blue-600 ${
                    pathname === path || (pathname === '/' && path === '/products')
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                      : ''
                  }`}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </header>

        <main className='flex-grow'>{children}</main>

        <footer className='bg-white shadow-md mt-6'>
          <div className='max-w-7xl mx-auto px-4 py-6 text-center text-gray-600'>© 2025 E-Shop, All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
