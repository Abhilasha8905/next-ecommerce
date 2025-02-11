# Technical Task for a Mid/Senior-Level Frontend Developer: React and Next.js

## Overview

You are tasked with creating a small e-commerce application using React and Next.js with the App Router feature. The application should allow users to browse products, view product details, add products to a shopping cart, checkout, and view orders. Your solution should demonstrate your understanding of modern frontend development practices, including component design, state management, routing, and API integration.

## Requirements

### Application Structure

#### Create a Next.js Application:
- This step is already done for you. You can use the provided repo and start working on the task right away. The repository contains a basic Next.js setup with TypeScript, TailwindCSS, UI Components ([shadcn/ui](https://ui.shadcn.com/docs/components/accordion)), a sample page to get you started, and boilerplate for the pages required.
    > Feel free to pick the UI components you need to build the application. The project is shipped with a `Button` component only. Use shadcn/ui CLI (`npx shadcn@latest add <component>`) to add more components to your project.
- The application is also set up with a mock API using an in-memory database. You can use this API to fetch product, category, and order data in addition to checkout. The API consists of the following endpoints (feel free to modify/extend the endpoints if needed):
    1. `GET /api/products`: Get a list of products.
    2. `GET /api/products/:id`: Get a single product by ID.
    3. `GET /api/categories`: Get a list of product categories.
    4. `GET /api/categories/:id`: Get a single category by ID.
    5. `GET /api/orders`: Get a list of orders.
    6. `GET /api/orders/:id`: Get a single order by ID.
    7. `POST /api/checkout`: Submit an order.

#### Folder Structure:
   - Organize your project folder into appropriate components, pages, and styles directories.
   - The sample repository already contains a `app`, `components`, `types`, `lib`, and `config` directory to help you get started.

> **Note:** You are free to use any additional libraries or tools you see fit to complete the task. However, please ensure that you can justify your choices in the code comments or the accompanying markdown document.

### Features

1. **Products Page (main page):**
   - Display a list of products fetched from the API.
   - Each product should display an image, name, price, a button to add the product to the card and another to view product details.
2. **Product Page:**
   - Create a dynamic route that displays product details when a product is clicked.
   - The details should include the product description, additional images, and an "Add to Cart" button.
3. **Categories Page:**
   - Create a page that displays a list of product categories.
   - Users should be able to click on a category to view products within that category.
4. **Cart Functionality:**
   - Implement a shopping cart using React Context API for a state management solution and one of the available Browser Storage APIs (e.g., Local Storage) to persist the cart data.
   - Users should be able to view the cart, update quantities, remove items, and proceed to checkout.
5. **Checkout Page:**
   - Create a checkout page where users can enter their shipping information and complete the order.
   - Display a summary of the order, including the total price and items in the cart.
   - Upon successful order placement, show a confirmation message and clear the cart.
6. **Orders Page (order history):**
   - Implement a page where users can view their order history.
   - Display a list of past orders with details such as order number (ID), date, total price, and items purchased.
7. **Responsive Design:**
   - Ensure the application is fully responsive and works well on various screen sizes.
8. **Error Handling:**
   - Implement error handling for API requests (e.g., display a user-friendly message if the product data fails to load).
9. **Infinite Scrolling:** \[optional]
   - Implement infinite scrolling on a category page (some listing page) to load more products as the user scrolls down.
10. **Loading States:** \[optional]
   - Show loading indicators while data is being fetched.

### Next.js Specifics

1. **API Routes:**
   - If applicable, create API routes to handle any backend logic or data fetching that you may additionally need.
3. **Static Generation (SSG) and/or Server-Side Rendering (SSR):**
   - Make use of one or both of these methods for rendering pages to improve performance and SEO and explain your reasoning in the code comments.

### Testing Requirements

1. **Unit Tests:**
   - Nice to have. Not required.
2. **End-to-End Tests:**
   - Manual testing is sufficient for this task. Ensure that the application works as expected and meets the functional requirements.

## Bonus Challenges

1. **Accessibility:**
   - Ensure that your application meets basic accessibility standards (e.g., using semantic HTML, proper ARIA labels).
2. **Performance Optimization:**
   - Implement techniques to optimize performance, such as image optimization, prerendering, or lazy loading, etc ...
3. **Animations:**
   - Implement basic animations (e.g., for the cart icon when items are added), and skeleton placeholders for loading states.

## Submission Requirements

- Include a markdown document with the name `SOLUTION.md` explaining your thought process, architecture decisions, and any libraries or tools you used.

> **Note:** If you are receiving this task as zip archive without version control (git), make sure to initialize the repo yourself, commit everything initially without any changes, and then proceed with committing your changes to the repo.

## Evaluation Criteria

- **Code Quality**: Clarity, structure, and organization of code.
- **Functional Requirements**: Adherence to specified features and functionality.
- **Performance**: How well the application performs and loads.
- **User Experience**: Overall usability, design, and responsiveness of the application. Keep the UI simple and clean, do not spend too much time on the design.

By completing this task, you will showcase your ability to develop a feature-rich application using React and Next.js while adhering to best practices in software development. Good luck!
