export type Price = {
  amount: number;
  currency: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: Price;
  images: string[];
  categories: string[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type LineItem = {
  id: string;
  referenceId: string;
  type: 'PRODUCT' | 'DISCOUNT' | 'DELIVERY';
  price: Price;
  quantity?: number;
};

export type Cart = {
  tax: number;
  items: LineItem[];
  subtotal: Price;
  total: Price;
};

export type Checkout = {
  user: User;
  products: CheckoutItem[];
};

export type CheckoutItem = {
  id: string;
  quantity?: number;
};

export type User = {
  id: string;
  name: string;
};

export type Order = {
  id: string;
  user: User;
  cart: Cart;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp?: Date;
};
