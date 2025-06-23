# 🧪 Pharmacy Website Project Plan

## 🚀 Overview

This is a pharmacy website project where users can browse and **order drugs online**. The goal is to create a smooth, fast, and user-friendly experience for customers while giving the business owner control over inventory and orders.

---

## 🛠️ Tech Stack

### Frontend
- **React** (for UI)
- **Vite** (fast dev build tool)
- **TypeScript** (type-safe frontend code)
- **TailwindCSS** (optional, for styling)

### Backend
- **Node.js + Express** (RESTful API server)
- **MySQL** (Relational database to store products, orders, users)
- **JWT** (Authentication)
- **bcrypt** (Password hashing)

---

## 🌐 FRONTEND PLAN

### 📁 Folder Structure

```
/src
  /components
  /pages
  /services
  /contexts
  /hooks
  /types
  /assets
  App.tsx
  main.tsx
```

### 🧩 Key Pages

| Page              | Purpose                                  |
|-------------------|------------------------------------------|
| Home              | Welcome, featured drugs, banner          |
| Products          | List/search/filter drugs                 |
| Product Details   | Drug info, dosage, side effects, etc.    |
| Cart              | Review cart items                        |
| Checkout          | Enter shipping info, confirm order       |
| Login/Register    | Auth pages                               |
| Dashboard         | Admin panel to manage products/orders    |
| Orders            | Customer order history                   |

### 🔐 Authentication Flow
- JWT-based login/signup
- Store JWT in localStorage or cookies
- Protected routes (e.g., Checkout, Dashboard)

### 📦 Features
- Drug listing (name, image, price, description)
- Search + filter by category
- Add to cart
- Place order (checkout flow)
- View past orders
- Admin: Add/update/remove drugs
- Admin: View all orders

---

## 🧠 BACKEND PLAN

### 📁 Folder Structure

```
/server
  /controllers
  /routes
  /models
  /middlewares
  /utils
  app.js
  config.js
```

### 🔐 Auth Flow
- Register/login routes with hashed passwords (bcrypt)
- Middleware to protect routes using JWT

### 🧾 API Endpoints

#### Auth
- `POST /api/auth/register` – Create account
- `POST /api/auth/login` – Authenticate user

#### Products
- `GET /api/products` – List all drugs
- `GET /api/products/:id` – Get drug by ID
- `POST /api/products` – Add new drug (admin only)
- `PUT /api/products/:id` – Update drug (admin only)
- `DELETE /api/products/:id` – Delete drug (admin only)

#### Orders
- `POST /api/orders` – Place an order
- `GET /api/orders/user/:userId` – Get user orders
- `GET /api/orders` – Get all orders (admin only)

### 🗃️ MySQL Tables

#### `users`
| Field       | Type         |
|-------------|--------------|
| id          | INT (PK)     |
| name        | VARCHAR      |
| email       | VARCHAR      |
| password    | VARCHAR (hashed) |
| is_admin    | BOOLEAN      |

#### `products`
| Field       | Type         |
|-------------|--------------|
| id          | INT (PK)     |
| name        | VARCHAR      |
| description | TEXT         |
| price       | DECIMAL      |
| image       | VARCHAR      |
| category    | VARCHAR      |

#### `orders`
| Field       | Type         |
|-------------|--------------|
| id          | INT (PK)     |
| user_id     | INT (FK)     |
| total       | DECIMAL      |
| created_at  | DATETIME     |

#### `order_items`
| Field       | Type         |
|-------------|--------------|
| id          | INT (PK)     |
| order_id    | INT (FK)     |
| product_id  | INT (FK)     |
| quantity    | INT          |
| price       | DECIMAL      |

---

## 🧠 Summary & Execution

- Start with frontend scaffolding: setup pages, navigation, auth
- Implement backend auth & product APIs first
- Connect frontend with backend via Axios or Fetch
- Secure routes, build admin dashboard
- Finalize styling, polish UX

This plan will help you build fast without confusion 🚀
