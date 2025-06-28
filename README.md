# NestJS Prisma UnitOfWork Repository Pattern

A clean, scalable, and testable NestJS starter template implementing **Prisma ORM** with the **Repository Pattern**, **Unit of Work**, and **Base Entity/Repository** abstractions. Includes Redis caching for performance optimization.

---

## 📁 Project Structure

src/
├── app.module.ts          # Root module
├── main.ts                # Entry point
├── database/
│   ├── prisma.module.ts   # Prisma module
│   └── prisma.service.ts  # Prisma client wrapper
├── redis/
│   ├── redis.module.ts    # Redis module
│   └── redis.service.ts   # Redis caching service
├── entities/
│   └── base.entity.ts     # Base entity with common fields
├── interfaces/
│   ├── identifier.interface.ts # Identifier interface
│   ├── repository.interface.ts # Repository interface
│   └── unit-of-work.interface.ts # Unit of Work interface
├── repositories/
│   ├── base.repository.ts       # Base repository with common methods
│   └── users.repository.ts      # User repository extending base repo
├── services/
│   └── users.service.ts         # Business logic layer
├── controllers/
│   └── users.controller.ts      # HTTP request handling
└── dto/
    └── create-user.dto.ts       # DTOs with validation schemas


---

## 🎯 Project Goals

- Implement **Repository Pattern** for data access separation  
- Use **Unit of Work** pattern to manage transactions and coordinate multiple repositories  
- Provide reusable **BaseEntity** and **BaseRepository** to avoid repetition  
- Support **pagination**, **filtering**, and **sorting** out of the box  
- Leverage **Prisma** for type-safe ORM operations  
- Integrate **Redis** caching for faster data retrieval  
- Ensure clean, testable, and maintainable code  

---

## 🏗 Layers Explained

### 1. Entity Layer  
Defines domain models. All entities inherit from `BaseEntity` which includes fields like `id`, `createdAt`, `updatedAt`, `archivedAt`.

### 2. Repository Layer  
Handles direct data access logic. `BaseRepository` offers generic CRUD methods. Specific repositories extend it for custom queries.

### 3. Unit of Work Layer  
Manages transaction boundaries and coordinates repositories to ensure atomic operations.

### 4. Service Layer  
Contains business rules and logic, using repositories as data sources.

### 5. Controller Layer  
Exposes REST API endpoints, validates input, and delegates requests to services.

---

## ⚙️ Key Features

- Full CRUD operations for User entity  
- Dynamic pagination, filtering, and sorting support  
- Input validation using **Zod**  
- Redis caching integration  
- Extensible and modular architecture  

---

## 🚀 Quick Start

```bash
npm install
npx prisma migrate dev
npm run start:dev


---

## 🎯 Project Goals

- Implement **Repository Pattern** for data access separation  
- Use **Unit of Work** pattern to manage transactions and coordinate multiple repositories  
- Provide reusable **BaseEntity** and **BaseRepository** to avoid repetition  
- Support **pagination**, **filtering**, and **sorting** out of the box  
- Leverage **Prisma** for type-safe ORM operations  
- Integrate **Redis** caching for faster data retrieval  
- Ensure clean, testable, and maintainable code  

---

## 🏗 Layers Explained

### 1. Entity Layer  
Defines domain models. All entities inherit from `BaseEntity` which includes fields like `id`, `createdAt`, `updatedAt`, `archivedAt`.

### 2. Repository Layer  
Handles direct data access logic. `BaseRepository` offers generic CRUD methods. Specific repositories extend it for custom queries.

### 3. Unit of Work Layer  
Manages transaction boundaries and coordinates repositories to ensure atomic operations.

### 4. Service Layer  
Contains business rules and logic, using repositories as data sources.

### 5. Controller Layer  
Exposes REST API endpoints, validates input, and delegates requests to services.

---

## ⚙️ Key Features

- Full CRUD operations for User entity  
- Dynamic pagination, filtering, and sorting support  
- Input validation using **Zod**  
- Redis caching integration  
- Extensible and modular architecture  

---

## 🚀 Quick Start

```bash
npm install
npx prisma migrate dev
npm run start:dev
