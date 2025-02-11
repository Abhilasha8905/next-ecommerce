'use client';

import localFont from 'next/font/local';
import './globals.css';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Products', path: '/products' },
    { name: 'Orders', path: '/orders' },
    { name: 'Cart', path: '/cart' },
  ];

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-100`}>
        <header className='bg-white shadow-md sticky top-0 z-50 h-16'>
          <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
            <Button
              variant='link'
              onClick={() => router.push('/')}
              className='text-2xl font-bold text-gray-800 hover:text-blue-600'
            >
              E-Shop
            </Button>
            <div className='md:hidden'>
              <Button variant='ghost' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
            <nav className='hidden md:flex space-x-6'>
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
            </nav>
          </div>
          {menuOpen && (
            <div className='md:hidden bg-white shadow-md p-4 flex flex-col space-y-2'>
              {navItems.map(({ name, path }) => (
                <Button
                  key={path}
                  variant='link'
                  onClick={() => {
                    router.push(path);
                    setMenuOpen(false);
                  }}
                  className='text-gray-600 hover:text-blue-600 text-lg'
                >
                  {name}
                </Button>
              ))}
            </div>
          )}
        </header>
        <main className='max-w-7xl mx-auto px-4 py-6 '>{children}</main>
        <footer className='bg-white shadow-md mt-6 p-4 text-center text-gray-600'>
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
