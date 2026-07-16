# E-commerce Platform

A modern, scalable e-commerce backend API built with NestJS, designed to power efficient and secure online shopping experiences.

## 🎯 Project Overview

This project is a full-featured e-commerce platform API that provides comprehensive functionality for managing products, users, orders, and transactions. Built with NestJS and TypeScript, it follows best practices for building enterprise-grade applications with excellent performance and maintainability.

## ✨ Key Features

### 🛍️ Product Management
- Product catalog with search and filtering capabilities
- Product categorization and tagging
- Inventory management and stock tracking
- Product reviews and ratings
- Image gallery support

### 👥 User Management
- User authentication and authorization
- Role-based access control (Customer, Admin, Vendor)
- User profile management
- Address book for shipping
- Wishlist functionality

### 🛒 Shopping Cart & Checkout
- Dynamic shopping cart management
- Multiple payment method support
- Order creation and management
- Order tracking and status updates
- Invoice generation

### 💳 Payment Processing
- Integration with popular payment gateways
- Secure transaction handling
- Payment method management
- Transaction history and receipts

### 📊 Admin Dashboard
- Dashboard analytics and insights
- User and order management
- Product catalog administration
- Payment and revenue tracking
- Reporting and export capabilities

### 🔐 Security Features
- JWT-based authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Data encryption for sensitive information

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** NestJS (TypeScript)
- **Database:** [Database Type - e.g., PostgreSQL, MongoDB]
- **Authentication:** JWT
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest
- **Deployment:** Docker

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- [Required services - e.g., PostgreSQL, Redis]

### Setup Instructions

```bash
# Clone the repository
$ git clone https://github.com/hondAAA99/E-commerce.git
$ cd E-commerce

# Install dependencies
$ npm install

# Create environment configuration
$ cp .env.example .env
$ # Update .env with your configuration
```

## 🚀 Running the Application

```bash
# Development mode with hot-reload
$ npm run start:dev

# Production mode
$ npm run start:prod

# Watch mode
$ npm run start
```

The API will be available at `http://localhost:3000`

## 📖 API Documentation

Once the application is running, access the interactive API documentation at:
- **Swagger UI:** `http://localhost:3000/api`
- **OpenAPI JSON:** `http://localhost:3000/api-json`

## 🧪 Testing

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# Generate test coverage report
$ npm run test:cov
```

## 🐳 Docker Deployment

```bash
# Build Docker image
$ docker build -t ecommerce-api .

# Run container
$ docker run -p 3000:3000 --env-file .env ecommerce-api
```

## 📁 Project Structure

```
src/
├── modules/
│   ├── users/
│   ├── products/
│   ├── orders/
│   ├── payments/
│   └── auth/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── middleware/
├── config/
├── database/
└── main.ts
```

## 🔑 Environment Configuration

Create a `.env` file in the root directory:

```
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_URL=your_database_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600

# Payment Gateway
PAYMENT_GATEWAY_KEY=your_payment_key
PAYMENT_GATEWAY_SECRET=your_payment_secret

# Email Configuration
MAIL_HOST=your_mail_host
MAIL_PORT=587
MAIL_USER=your_email
MAIL_PASSWORD=your_email_password
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Orders
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PUT /orders/:id/status` - Update order status (Admin)

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/:id` - Get user details (Admin)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is MIT licensed - see the LICENSE file for details.

## 📞 Support & Contact

- **Issues:** Use the [GitHub Issues](https://github.com/hondAAA99/E-commerce/issues) page
- **Questions:** Start a [Discussion](https://github.com/hondAAA99/E-commerce/discussions)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com)
- Inspired by industry best practices for e-commerce platforms

---

**Made with ❤️ by hondAAA99**
