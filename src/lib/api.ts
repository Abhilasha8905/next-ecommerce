import type { Product, Category, Order, User, CheckoutItem } from '@/types/app';
import { TAX_RATE } from '@/config/constants';

type Storage = {
  products: Map<string, Product>;
  categories: Map<string, Category>;
  orders: Map<string, Order>;
};

declare global {
  var storage: Storage | undefined; // eslint-disable-line no-var
}

export const storage: Storage = globalThis.storage || {
  products: new Map<string, Product>(),
  categories: new Map<string, Category>(),
  orders: new Map<string, Order>(),
};

if (process.env.NODE_ENV !== 'production') {
  globalThis.storage = storage;
}

export const data = {
  get users() {
    return Array.from({ length: 1 }, (_, i) => createUser(i + 1));
  },
  get categories() {
    if (storage.categories.size !== 0) {
      return [...storage.categories.values()];
    }

    return Array.from({ length: 5 }, (_, i) => {
      const category = createCategory(i + 1);

      storage.categories.set(category.id, category);

      return category;
    });
  },
  get products() {
    if (storage.products.size !== 0) {
      return [...storage.products.values()];
    }

    return Array.from({ length: 50 }, (_, i) => {
      const product = createProduct(i + 1);

      storage.products.set(product.id, product);

      return product;
    });
  },
  get orders() {
    return [...storage.orders.values()];
  },
};

export async function checkout(user: User, items: CheckoutItem[]) {
  const products = data.products.filter(product => items.some(item => item.id === product.id));

  if (!products.length) {
    throw new Error('No products to checkout');
  } else if (products.length !== items.length) {
    throw new Error('Unable to checkout some products');
  }

  const order = createOrder(data.orders.length + 1, items, products, user);

  storage.orders.set(order.id, order);

  setTimeout(() => {
    storage.orders.set(order.id, { ...order, status: 'COMPLETED' });
  }, 5000);

  return order;
}

function createUser(id: number): User {
  return {
    id: `00000000-0000-0000-0000-${String(id).padStart(12, '0')}`,
    name: `User ${id}`,
  } satisfies User;
}

function createCategory(id: number): Category {
  return {
    id: `00000000-0000-0000-0000-${String(id).padStart(12, '0')}`,
    slug: `category-${id}`,
    name: `Category ${id}`,
    description: `Description for Category ${id}.`,
    image: `https://placehold.co/1000x1000?text=${encodeURIComponent(`Category ${id}`)}`,
  } satisfies Category;
}

function createProduct(id: number): Product {
  return {
    id: `00000000-0000-0000-0000-${String(id).padStart(12, '0')}`,
    name: `Product ${id}`,
    description: `Description for Product ${id}.`,
    images: Array.from({ length: 3 }, (_, j) => {
      return `https://placehold.co/1000x1000?text=${encodeURIComponent(`Product ${id} - Image ${j + 1}`)}`;
    }),
    price: {
      amount: id * 9.99,
      currency: 'USD',
    },
    categories: [
      ...new Set(
        Array.from({ length: 3 }, () => {
          return `category-${Math.floor(Math.random() * 5) + 1}`;
        }),
      ),
    ],
  } satisfies Product;
}

function createOrder(id: number, items: CheckoutItem[], products: Product[], user: User): Order {
  return {
    id: `00000000-0000-0000-0000-${String(id).padStart(12, '0')}`,
    status: 'PENDING',
    user,
    cart: {
      tax: TAX_RATE,
      items: products.map((product, i) => {
        const item = items.find(item => item.id === product.id);
        return {
          id: `00000000-0000-0000-0000-0000000000${String(i + 1).padStart(2, '0')}`,
          referenceId: product.id,
          type: 'PRODUCT',
          price: product.price,
          quantity: item?.quantity ?? 1,
        };
      }),
      subtotal: products.reduce(
        (total, product) => {
          const quantity = items.find(i => i.id === product.id)?.quantity ?? 1;

          const price = {
            amount: total.amount + product.price.amount * quantity,
            currency: total.currency,
          };

          return price;
        },
        { amount: 0, currency: 'USD' },
      ),
      total: products.reduce(
        (total, product, i, products) => {
          const quantity = items.find(i => i.id === product.id)?.quantity ?? 1;

          const price = {
            amount: total.amount + product.price.amount * quantity,
            currency: total.currency,
          };

          if (i === products.length - 1) {
            price.amount *= TAX_RATE < 1 ? TAX_RATE + 1 : TAX_RATE;
          }

          return price;
        },
        { amount: 0, currency: 'USD' },
      ),
    },
    timestamp: new Date(),
  } satisfies Order;
}

// bootstrap
(async () => {
  data.users;
  data.categories;
  data.products;
  data.orders;

  if (data.orders.length === 0) {
    await checkout(
      data.users.at(0)!,
      data.products.slice(0, 3).map(product => ({ id: product.id })),
    )
      .then(() => {
        console.info('DB: initial order created');
      })
      .catch(error => {
        console.error('DB: failed to create initial order', error);
      });
  }
})();
