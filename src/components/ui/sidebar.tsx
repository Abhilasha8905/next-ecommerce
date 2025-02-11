import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SidebarProps {
  categories: { slug: string; name: string }[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategories, toggleCategory, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='hidden md:flex flex-col w-64 bg-white p-6 border-r shadow-lg h-screen sticky top-0 rounded-r-2xl'>
        <h2 className='text-lg font-semibold text-gray-700 mb-4'>Categories</h2>
        <div className='space-y-3'>
          {categories.map(category => (
            <label
              key={category.slug}
              className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition'
            >
              <input
                type='checkbox'
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className='form-checkbox h-5 w-5 text-blue-600 accent-blue-600'
              />
              <span className='text-gray-700'>{category.name}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <aside
          className={`fixed top-0 left-0 w-72 bg-white p-6 h-full transition-transform duration-300 ease-in-out shadow-2xl z-50 rounded-r-2xl
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg font-semibold text-gray-700'>Filters</h2>
            <Button variant='ghost' onClick={() => setIsSidebarOpen(false)} className='p-2 rounded-full hover:bg-gray-200'>
              <X size={20} />
            </Button>
          </div>

          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Categories</h2>
          <div className='space-y-3'>
            {categories.map(category => (
              <label
                key={category.slug}
                className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition'
              >
                <input
                  type='checkbox'
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  className='form-checkbox h-5 w-5 text-blue-600 accent-blue-600'
                />
                <span className='text-gray-700'>{category.name}</span>
              </label>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
