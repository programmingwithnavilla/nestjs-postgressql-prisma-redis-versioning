# NestJS + PostgreSQL + Prisma + Redis Versioning Boilerplate

This repository is a professional-grade boilerplate for building scalable APIs using NestJS, PostgreSQL, Prisma ORM, Zod validation, and Redis-based versioning. It is designed with best practices suitable for high-standard engineering teams, including those at organizations like Google.

---

## 🎯 Project Objective

The primary goal of this project is to demonstrate **Redis-based versioning** for user data in a highly structured backend API architecture. This includes:

- Complete CRUD operations for a `User` entity.
- Validation using `Zod` for input schemas.
- Database interaction via `Prisma` ORM.
- Data versioning using `Redis`, to track every modification in a user lifecycle.
- Advanced API design for filtering, sorting, and paginating data.

---

## 🔧 Tech Stack

| Tool         | Purpose                           |
|--------------|-----------------------------------|
| NestJS       | Main framework                    |
| PostgreSQL   | Relational Database               |
| Prisma       | Type-safe ORM                     |
| Zod          | Runtime input validation          |
| Redis        | Caching and versioning mechanism  |
| ioredis      | Redis client for Node.js          |

---

## 📁 Project Structure

```bash
src/
├── common/
│   ├── base.entity.ts
│   ├── base.repository.ts
├── app.module.ts
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── users.repository.ts
│   └── dto/
│       ├── create-user.dto.ts
│       ├── update-user.dto.ts
│       ├── query-user.dto.ts
├── redis/
│   └── redis.module.ts
prisma/
├── schema.prisma
.env
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nest-redis-user-crud.git
cd nest-redis-user-crud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup PostgreSQL
Update your `.env` file:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdb"
```

### 4. Setup Prisma
```bash
npx prisma generate
npx prisma db push
```

### 5. Setup Redis
Ensure Redis is installed and running locally on `localhost:6379`. You can use Docker:
```bash
docker run --name redis -p 6379:6379 -d redis
```

### 6. Run the server
```bash
npm run start:dev
```

---

## 🔁 Redis Versioning Concept

Redis is used to track versions of user entities. This pattern is especially useful in distributed systems where multiple services need to be aware of the data's freshness.

### Example Usage:
- When a user is created: `user:1:version = 1`
- On each update: version is incremented: `INCR user:1:version`
- Other services can watch this key to invalidate their caches or re-fetch fresh data

### Benefits:
- Lightweight and fast
- Stateless API (versioning is externalized)
- Enables eventual consistency strategies in microservices

---

## 📚 Advanced API Design

### Query Parameters for Listing Users

- **Pagination**: `page`, `size`
- **Sorting**: `sort=name:asc`, `sort=createdAt:desc`
- **Filtering**:
  - Exact: `filter[name]=john`
  - Multiple conditions: `filter[createdAt][lte]=2024-01-01`, `filter[email]=example@site.com`

#### Sample Request:
```
GET /users?page=2&size=10&sort=createdAt:desc&filter[name]=john&filter[createdAt][lte]=2024-01-01
```

---

## 🧱 Base Entity & Repository Pattern

### `BaseEntity`
Common fields like `id`, `createdAt`, `updatedAt`:
```ts
export abstract class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### `BaseRepository`
Encapsulates common DB methods (pagination, filtering, sorting).

### `UserRepository`
Extends `BaseRepository`, handles user-specific queries and integrates Redis versioning.

---

## 🧪 Sample API Endpoints

| Method | Route        | Description                     |
|--------|--------------|---------------------------------|
| GET    | `/users`     | List users with filters/sort    |
| POST   | `/users`     | Create a new user               |
| GET    | `/users/:id` | Retrieve user by ID             |
| PUT    | `/users/:id` | Update a user                   |
| DELETE | `/users/:id` | Delete a user                   |

---

## 🧠 Contributions

This boilerplate is maintained with long-term maintainability and production-readiness in mind. Feel free to contribute by submitting pull requests.

---

## 📜 License

MIT License
