# Event Scheduling & Booking API

A high-performance, scalable backend service built with **NestJS** and **Firebase Firestore**, designed to handle real-time event management and concurrent bookings with high reliability.

## 🚀 Overview

This API serves as the backbone for an event management platform. It provides robust endpoints for event discovery and a transaction-safe booking system that guarantees data consistency even under high concurrency.

### Key Architectural Pillars
- **Transactional Integrity**: Leveraging Firestore's ACID transactions to manage event capacity and prevent overbooking.
- **Scalable Discovery**: Implementation of cursor-based pagination for efficient retrieval of large datasets.
- **Type-Safe Design**: Built entirely in TypeScript with strict validation schemas using `class-validator` and `class-transformer`.
- **Modular Architecture**: Clean separation of concerns following NestJS best practices (Modules, Controllers, Services, and Repositories).

---

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Database**: [Google Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Documentation**: [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Validation**: `class-validator`
- **Configuration**: `@nestjs/config`

---

## 🏗 Core Features

### 1. Transactional Booking System
The booking logic is wrapped in a Firestore transaction to ensure atomic operations. It validates:
- Event existence and data integrity.
- Real-time capacity availability.
- User idempotency (prevents duplicate bookings using composite keys).

### 2. Advanced Querying & Pagination
All list endpoints support cursor-based pagination via `limit` and `lastId` parameters, ensuring the API remains responsive as the dataset grows.

### 3. Global Resilience
- **Exception Filtering**: A global `AllExceptionsFilter` catches and normalizes all errors into a structured RFC-compliant JSON format, including stack traces in non-production environments.
- **Input Sanitization**: Strict `ValidationPipe` ensures only clean, validated data enters the domain logic.

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- A Firebase Project with Firestore enabled.

### Installation
```bash
npm install
```

### Configuration
Create a `.env` file in the root directory:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"
```

### Running the App
```bash
# Development (watch mode)
npm run start:dev

# Production mode
npm run start:prod
```

---

## 📖 API Documentation

Once the application is running, you can access the interactive Swagger documentation at:
**`http://localhost:3000/api-docs`**

The documentation provides:
- Full schema definitions for DTOs.
- Interactive "Try it out" functionality.
- Response examples and status code definitions.

---

## 🧪 Testing

The project includes a comprehensive suite of tests:
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

---

## ⚖ License
This project is [UNLICENSED](LICENSE).
