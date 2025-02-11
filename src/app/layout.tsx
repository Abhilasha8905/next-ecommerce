'use client';
import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className='bg-white shadow-md sticky top-0 z-10'></header>
        <footer className='bg-white shadow-md mt-6'>
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
          {children}
        </footer>
      </body>
    </html>
  );
}
