# 🚀 Pro-Booker Backend: Enterprise-Grade Booking System

A robust, scalable booking management system built with **Node.js** and **TypeScript**. This project is engineered following **Clean Architecture** principles and **SOLID** design patterns to ensure maintainability, testability, and high-quality software standards.

---

## 🎯 Project Overview
Pro-Booker is a backend solution designed to handle complex scheduling logic, specifically focusing on resource allocation and preventing double-bookings. It serves as a showcase of modern backend development practices, emphasizing decoupled logic and type safety.

## 🏗️ Architecture & Design Patterns
This project strictly adheres to **Clean Architecture** (Uncle Bob's approach), ensuring that the business logic remains independent of external frameworks, databases, or UI:

### 1. Core Layer (Domain)
- **Entities:** Contains pure business objects (`Booking`, `User`, `Room`).
- **Repositories (Interfaces):** Defines the contracts for data persistence, applying the **Dependency Inversion Principle (DIP)**. Business logic depends on abstractions, not implementations.

### 2. Use Cases Layer (Application)
- Orchestrates the flow of data to and from entities.
- Implements critical business rules, such as **Booking Overlap Validation** and time-slot constraints.
- Examples: `CreateBooking`, `CancelBooking`, `GetUserBookings`.

### 3. Infrastructure Layer
- **External Tools:** Contains concrete implementations of repository interfaces using **Prisma ORM**.
- **Database:** PostgreSQL managed via Docker for environment consistency.
- **Security:** Hashing and Token services (Bcrypt/JWT) — (Planned 🚧)

### 4. Interface Layer (Presentation)
- **Controllers:** Handles HTTP requests and maps them to Use Cases.
- **Validation:** Uses **Zod** for schema-based request validation.
- **Middlewares:** Centralized error handling and (upcoming) authentication guards.

---

## 🛠️ Tech Stack
| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js (v20+) |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **ORM** | Prisma |
| **Database** | PostgreSQL (Dockerized) |
| **Validation** | Zod |
| **Logging** | ts-node-dev |

---

## 📂 Project Structure

├── 📁 prisma                 # Database Schema & Migrations (Prisma ORM)
│   ├── 📁 migrations         # History of database changes
│   └── 📄 schema.prisma      # Data models definition
├── 📁 src
│   ├── 📁 core               # 🧠 Domain Layer (Pure Business Logic)
│   │   ├── 📁 entities       # Domain Objects (Booking, User, Room)
│   │   └── 📁 repositories   # Abstract Interfaces (Dependency Inversion)
│   ├── 📁 use-cases          # ⚙️ Application Layer (Business Orchestration)
│   │   └── 📁 booking        # Specific logic for booking operations
│   ├── 📁 infrastructure     # 🔌 Data Layer (External Tools & Drivers)
│   │   ├── 📁 database       # Prisma Client configuration
│   │   └── 📁 repositories   # Concrete implementations of Core Interfaces
│   ├── 📁 interfaces         # 🌐 Presentation Layer (Adapters)
│   │   ├── 📁 controllers    # Request handling & Use Case execution
│   │   ├── 📁 dtos           # Data Transfer Objects (Validation Schemas)
│   │   ├── 📁 middlewares    # Error handling & Security guards
│   │   └── 📄 routes.ts      # API Endpoint definitions
│   ├── 📁 shared             # 🛠️ Cross-cutting concerns (Global Helpers)
│   │   └── 📁 utils          # Reusable utility functions
│   └── 📄 server.ts          # Application entry point
├── 🐳 docker-compose.yml     # Containerized environment (PostgreSQL)
├── 📄 .env.example           # 🔑 Template for environment variables
└── 📄 tsconfig.json          # TypeScript compiler configuration

---

## 📡 API Documentation

This section details the available endpoints for the Booking System.

### 🗓️ Bookings
Manage room reservations and schedules.

#### 1. Create a Booking
* **URL:** `/api/bookings`
* **Method:** `POST`
* **Body:**
    ```json
    {
      "userId": "string",
      "roomId": "string",
      "startTime": "ISO-Date",
      "endTime": "ISO-Date"
    }
    ```
* **Success Response (201):**
    ```json
    {
      "status": "success",
      "data": { "id": "...", "status": "confirmed" }
    }
    ```

#### 2. Get User Bookings
* **URL:** `/api/bookings/user/:userId`
* **Method:** `GET`
* **Success Response (200):** A list of booking objects.

#### 3. Cancel Booking
* **URL:** `/api/bookings/:id`
* **Method:** `DELETE`
* **Success Response (200):** `{ "message": "Booking deleted" }`

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (Latest LTS)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   
```bash
    git clone [https://github.com/roudihannanIT/pro-booker-backend.git](https://github.com/roudihannanIT/pro-booker-backend.git)
    cd pro-booker-backend
```

2.  **Environment Setup**
Copy the example environment file and fill in your details:

```bash
    cp .env.example .env
    # Edit .env with your PostgreSQL credentials
```

3. **Spin up PostgreSQL via Docker:**

```bash
    docker-compose up -d # Start PostgreSQL
```

4. **Install dependencies:**

```bash
    npm install
```

5. **Apply Database Migrations:**

```bash
    npx prisma migrate dev # Sync schema
```

6. **Start Development Server:**

```bash
    npm run dev
```

---

## 🛣️ Roadmap & Upcoming Features
[x] Core Booking Logic: Clean Architecture implementation.

[ ] Authentication Module: JWT-based login/register with Bcrypt (Current Sprint 🚧).

[ ] Role-Based Access Control (RBAC): Implementing Admin vs. User permissions.

[ ] Unit Testing: Implementing Jest for Use Case logic coverage.

---

## 👨‍💻 Engineering Mindset
The primary goal of this repository is to demonstrate how to build software that is "Screaming Architecture" – where the folder structure itself tells you what the system does, rather than what framework it uses.

## 👨‍💻 Author
Roudi Hannan |  IT Engineer [[LinkedIn Profile Link](https://www.linkedin.com/in/roudi-hannan-6243a5366/)] | [[Instagram](https://www.instagram.com/roudihannan8)]

Entwickelt mit Fokus auf Qualität, Skalierbarkeit und Clean Code.