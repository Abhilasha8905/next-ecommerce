import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchProducts = async (categories?: string) => {
  const query = categories?.length ? `?categories=${categories}` : '';
  const response = await fetch(`/api/products${query}`);
  const data = await response.json();
  return data.data;
};

export const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data.data;
};

export const fetchProductDetails = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`);
  const data = await response.json();
  return data.data;
};

export const getOrders = async () => {
  const response = await fetch('/api/orders');
  const data = await response.json();
  return data.data;
};
