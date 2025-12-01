# Admin Dashboard with Analytics & Reporting

A full-stack MEAN (MongoDB, Express.js, Angular, Node.js) application for admin dashboard with analytics, reporting, and user management features.

## Features

- **Authentication & Authorization**

  - Secure JWT-based authentication
  - Role-based access control (Admin/User)
  - Protected routes and API endpoints

- **Analytics Dashboard**

  - Real-time metrics visualization
  - User sign-ups tracking (Line Chart)
  - Sales by category (Doughnut Chart)
  - Active sessions monitoring
  - Total revenue tracking

- **User Management**

  - View all users
  - Promote users to admin
  - Activate/Deactivate users
  - Delete users (Admin only)

- **Responsive Design**
  - Mobile-friendly Bootstrap 5 UI
  - Responsive charts and tables
  - Modern, clean interface

## Tech Stack & Versions

### Backend

- **Node.js** - v18.0.0 or higher (Runtime)
- **Express.js** - v5.1.0 (Web Framework)
- **MongoDB** - v6.0 or higher (Database) / MongoDB Atlas
- **Mongoose** - v9.0.0 (ODM)
- **jsonwebtoken** - v9.0.2 (JWT Authentication)
- **bcryptjs** - v3.0.3 (Password Hashing)
- **cors** - v2.8.5 (Cross-Origin Resource Sharing)
- **dotenv** - v17.2.3 (Environment Variables)
- **morgan** - v1.10.1 (HTTP Request Logger)

### Frontend

- **Angular** - v19.2.0 (Framework)
- **Angular CLI** - v19.2.19
- **TypeScript** - v5.7.2
- **Bootstrap** - v5.3.8 (UI Framework)
- **Chart.js** - v4.5.1 (Data Visualization Library)
- **ng2-charts** - v8.0.0 (Angular Chart.js Wrapper)
- **RxJS** - v7.8.0 (Reactive Extensions)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** - v9.0.0 or higher (comes with Node.js) or **yarn**
- **Angular CLI** - v16.0.0 or higher (install globally: `npm install -g @angular/cli`)
- **MongoDB** - v6.0 or higher running locally, OR
- **MongoDB Atlas** - Free cloud database account ([Sign up](https://www.mongodb.com/cloud/atlas))

### Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.x or higher

# Check npm version
npm --version   # Should be v9.x or higher

# Check Angular CLI version
ng version      # Should be v16.x or higher

# Check MongoDB (if installed locally)
mongod --version  # Should be v6.x or higher
```

## Quick Start (5 Minutes)

If you're in a hurry, follow these steps:

```bash
# 1. Backend Setup
cd backend
npm install
# Create .env file (see step 2 below)
npm run seed  # Populate database
npm run dev   # Start server on http://localhost:5000

# 2. Frontend Setup (new terminal)
cd frontend
npm install
npm start     # Start on http://localhost:4200

# 3. Login
# Open http://localhost:4200
# Use: admin@example.com / Admin@123
```

## 🛠️ Detailed Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd admin
```

### 2. Backend Setup

```bash
cd backend

npm install
npm install express mongoose jsonwebtoken bcryptjs cors dotenv morgan
npm install --save-dev nodemon



# Create .env file in backend directory
# Copy the example below and fill in your values
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**For MongoDB Atlas:**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard?retryWrites=true&w=majority
```

### 3. Seed the Database (Highly Recommended)

```bash
# From backend directory
npm run seed
```

This will create:

- **1 Admin user**: `admin@example.com` / `Admin@123`
- **50 Regular users** with realistic names and emails
- **12 months of historical data** including:
  - User sign-ups (trending upward over time)
  - Sales transactions across 8 categories
  - Active session data
  - Realistic trends (more sales on weekends, peak hours, etc.)

**Note**: The seed script will clear existing data and populate fresh data. This ensures your charts look impressive immediately!

### 4. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# 1) Install a matching CDK version for Angular 19
npm install @angular/cdk@^19.2.0

# 2) Now install chart.js and ng2-charts
npm install chart.js@^4.4.0 ng2-charts@^8.0.0

```

### 6. Start Frontend Development Server

```bash
ng serve -o
```

Frontend will run on `http://localhost:4200`

## Usage

### Default Login Credentials

After seeding the database:

- **Admin Account:**

  - Email: `admin@example.com`
  - Password: `Admin@123`
  - Access: Full dashboard + User management

- **Regular User Accounts:**
  - Any of the 50 seeded users (e.g., `john.smith0@example.com`, `jane.johnson1@example.com`)
  - Password: `User@123` (same for all seeded users)
  - Access: Dashboard view only (no user management)

### Accessing the Application

1. Open your browser and navigate to `http://localhost:4200`
2. You'll be redirected to the login page
3. Login with admin credentials to access the full dashboard
4. Regular users can only access the dashboard (limited features)

## Project Structure

```
admin/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Authentication logic
│   │   │   ├── dashboard.controller.js # Dashboard data
│   │   │   └── user.controller.js # User management
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js # JWT verification
│   │   │   └── error.middleware.js # Error handling
│   │   ├── models/
│   │   │   ├── user.model.js      # User schema
│   │   │   └── metric.model.js    # Metrics schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # Auth endpoints
│   │   │   ├── dashboard.routes.js # Dashboard endpoints
│   │   │   └── user.routes.js     # User management endpoints
│   │   ├── seed/
│   │   │   └── seed.js            # Database seeding
│   │   ├── app.js                 # Express app config
│   │   └── server.js              # Server entry point
│   ├── package.json
│   └── .env                       # Environment variables
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── guards/        # Route guards
    │   │   │   ├── interceptors/  # HTTP interceptors
    │   │   │   └── services/      # API services
    │   │   ├── features/
    │   │   │   ├── auth/          # Login component
    │   │   │   ├── dashboard/     # Dashboard component
    │   │   │   └── users/         # User management
    │   │   ├── shared/
    │   │   │   └── layout/        # Navbar, Sidebar
    │   │   ├── app.component.ts
    │   │   └── app.config.ts     # App configuration
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Dashboard

- `GET /api/dashboard/overview` - Get dashboard metrics (Admin only)

### User Management

- `GET /api/users` - Get all users (Admin only)
- `PATCH /api/users/:id/promote` - Promote user to admin (Admin only)
- `PATCH /api/users/:id/status` - Toggle user status (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Health Check

- `GET /api/health` - API health status

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- CORS enabled for frontend communication

## Features in Detail

### Dashboard Analytics

- **Total Users**: Count of all registered users
- **Active Sessions**: Sessions from last 15 minutes
- **Total Sales**: Count of sales transactions
- **Total Revenue**: Sum of all sales values
- **Sign-ups Chart**: Line chart showing user sign-ups over last 30 days
- **Sales by Category**: Doughnut chart showing sales distribution

### User Management

- View all users with their roles and status
- Promote regular users to admin
- Activate/Deactivate user accounts
- Delete users (with self-deletion protection)
