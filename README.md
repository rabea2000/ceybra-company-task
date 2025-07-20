# Ceybra Task - Custom E-Commerce Demo

This project is a simple e-commerce web application built with Laravel, Inertia.js, and React. It demonstrates a product , shopping cart (for both guests and authenticated users) 

## What Was Implemented

- **Product**: Browse, search, and (if authenticated) add new products with images. Products are managed via custom backend and frontend logic.
- **Shopping Cart**:
  - **Authenticated users**: Cart is stored in the database and persists across sessions.
  - **Guest users**: Cart is managed in local storage and can be merged into the database cart upon login/registration.


- **Testing**: Custom unit tests for CartService and ProductService

## Main Sections

- **Backend**
  - `ProductController`, `ProductService`, and Eloquent `Product` model for product logic
  - `CartController`, `CartService`, and Eloquent `CartItem` model for cart logic
  - Auth controllers for registration, login, and profile management
- **Frontend**
  - React pages/components for products, cart, and profile under `resources/js/`
  - Cart context for state management
  - Guest cart page and logic
- **Testing**
  - Unit tests in `tests/Unit/`


## How to Run Locally

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   composer install
   npm install
   ```
3. **Set up environment**
   - Copy `.env.example` to `.env` and configure your database and storage settings.
   - Generate an app key:
     ```sh
     php artisan key:generate
     ```
4. **Set up storage for product images**
   ```sh
   php artisan storage:link
   ```
   This creates a symbolic link from `public/storage` to `storage/app/public` so uploaded product images are accessible.
5. **Run migrations and seeders**
   ```sh
   php artisan migrate --seed
   ```
5. **Build frontend assets**
   ```sh
   npm run dev
   ```
6. **Start the development server**
   ```sh
   php artisan serve
   ```
7. **Run tests**
   ```sh
   php artisan test
   ```

## Project Structure

- `app/Http/Controllers/` - Custom controllers for products (`ProductController`), cart (`CartController`), 
- `app/Services/` - Custom business logic for products (`ProductService`) and cart (`CartService`)
- `app/Models/` - Eloquent models: `Product`, `CartItem` (custom)
- `resources/js/Pages/Products/` - Custom React pages: `Index.jsx`, `Create.jsx`
- `resources/js/Pages/Cart/` - Custom React pages: `Cart.jsx`, `GuestCart.jsx`
- `resources/js/Components/` - Custom React components: `ProductCard.jsx`, `ProductList.jsx`, `Cart.jsx`, `AddToCartButton.jsx`
- `resources/js/Contexts/` - Custom React context: `CartContext.jsx`
- `routes/web.php` - Web routes for products, cart, and guest cart 
- `database/` - Migrations and factories for products and cart items 
- `tests/` - Unit tests for custom services  product service 

## Notes
- Guest cart is handled via local storage and can be merged into the user's cart upon authentication.
- Product images are stored in the `public` disk under `/ProductPictures`.

---


