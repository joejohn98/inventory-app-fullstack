# 📦 Inventory Hub

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=for-the-badge&logo=postgresql)

**A modern, full-stack inventory management system built with Next.js 16 and React 19**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Docker](#-docker) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 🔐 Authentication & Security

- **Multiple Auth Methods**: Email/password registration and social login (GitHub, Google)
- **Secure Sessions**: Session-based authentication powered by Better Auth
- **Email Verification**: Verification tokens stored and managed via dedicated schema model
- **Protected Routes**: Server-side session validation for all protected pages
- **Form Validation**: Comprehensive client and server-side validation with Zod

### 📊 Dashboard Analytics

- **Key Metrics Overview**: Total products, inventory value, and delivered items
- **Department Distribution**: Interactive pie chart showing products by category
- **Low Stock Alerts**: Real-time monitoring of items running low on inventory
- **Efficiency Visualization**: Circular progress indicator for stock health

### 📦 Product Management

- **CRUD Operations**: Create, read, update, and delete products with ease
- **Image Uploads**: Cloudinary integration for product image storage
- **Smart Filtering**: Search by name, description, or SKU
- **Advanced Sorting**: Sort by name, price, or stock quantity
- **Pagination**: Efficient browsing with paginated product lists
- **Low Stock Filter**: Quick access to items needing restocking

### 🏢 Department & Supplier Management

- **Dynamic Departments**: Create and manage custom departments per user (relational model, not a fixed enum)
- **Supplier Tracking**: Manage suppliers with name, email, phone, and address
- **Department Overview**: Visual cards showing stock levels per department
- **User-Scoped Data**: All departments and suppliers are isolated per user account

### ⚙️ User Settings

- **Profile Management**: Update name, email, and profile image
- **Account Information**: View account status, verification, and creation date
- **Secure Updates**: Server-action based profile modifications

### 📱 Responsive Design

- **Mobile-First**: Fully responsive layout with mobile navigation
- **Collapsible Sidebar**: Seamless experience across all device sizes
- **Modern UI**: Clean, professional interface with smooth animations

---

## 🛠 Tech Stack

### Frontend

| Technology              | Version  | Purpose                         |
| ----------------------- | -------- | ------------------------------- |
| **Next.js**             | ^16.2.6  | React framework with App Router |
| **React**               | 19.2.3   | UI library with latest features |
| **TypeScript**          | 5.x      | Type-safe development           |
| **TailwindCSS**         | 4.x      | Utility-first styling           |
| **Lucide React**        | ^0.562.0 | Beautiful icon library          |
| **React Hook Form**     | ^7.70.0  | Performant form handling        |
| **Sonner**              | ^2.0.7   | Toast notifications             |
| **React Google Charts** | ^5.2.1   | Data visualization              |

### Backend

| Technology            | Version  | Purpose                               |
| --------------------- | -------- | ------------------------------------- |
| **Prisma**            | ^7.2.0   | Type-safe database ORM                |
| **@prisma/adapter-pg**| ^7.2.0   | Native PostgreSQL driver adapter      |
| **PostgreSQL**        | 17       | Relational database                   |
| **Better Auth**       | ^1.4.10  | Authentication solution               |
| **Zod**               | ^4.3.5   | Schema validation                     |
| **Cloudinary**        | ^2.8.0   | Image hosting & CDN                   |

### Infrastructure & Developer Experience

| Technology               | Purpose                         |
| ------------------------ | ------------------------------- |
| **Docker**               | Containerised development & deployment |
| **Docker Compose**       | Multi-service orchestration     |
| **ESLint**               | Code linting                    |
| **Babel React Compiler** | Automatic optimizations         |
| **PostCSS**              | CSS processing                  |
| **ts-node**              | TypeScript seed script runner   |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or hosted) — or use Docker (see below)
- **Cloudinary** account for image uploads

### Installation (Local)

1. **Clone the repository**

   ```bash
   git clone https://github.com/joejohn98/inventory-fullstack.git
   cd inventory-fullstack
   ```

2. **Install dependencies**

   ```bash
   npm install
   # Prisma client is auto-generated via the postinstall script
   ```

3. **Set up environment variables**

   Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # OAuth Providers
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**

   ```bash
   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker

The project includes full Docker support for both local development and production deployment.

### Development (with local PostgreSQL)

The dev stack uses `docker-compose.dev.yml` and spins up:
- **`app`** — Next.js dev server with hot-reload (volume-mounted source)
- **`db`** — PostgreSQL 17 with a health check
- **`prisma-migrate`** — One-shot migration runner (waits for DB to be healthy)
- **`prisma-studio`** — Prisma Studio GUI at `http://localhost:5555`

```bash
docker compose -f docker-compose.dev.yml up --build
```

The app will be available at **http://localhost:3000** and Prisma Studio at **http://localhost:5555**.

> **Note:** All environment variables (OAuth keys, Cloudinary, etc.) are read from your `.env` file. The `DATABASE_URL` is overridden inside Docker to point at the containerised `db` service.

### Production

The production stack (`docker-compose.yml`) targets an **external managed database** (e.g. Neon, Supabase, Railway). No database container is included.

1. Ensure your `.env` contains a valid production `DATABASE_URL`.
2. Build and run:

   ```bash
   docker compose up --build -d
   ```

A `prisma-migrate` service runs `prisma migrate deploy` before the app starts, ensuring the schema is always up to date.

#### Production Dockerfile highlights

The production `Dockerfile` is a **3-stage build**:

| Stage      | Base Image       | Purpose                                     |
| ---------- | ---------------- | ------------------------------------------- |
| `deps`     | node:24-alpine   | Install deps & generate Prisma client       |
| `builder`  | node:24-alpine   | Build the Next.js application               |
| `runner`   | node:24-alpine   | Lean runtime image (non-root `nextjs` user) |

---

## 📁 Project Structure

```
inventory-fullstack/
├── prisma/
│   ├── migrations/          # Database migration history
│   ├── schema.prisma        # Database schema (relational models)
│   └── seed.ts              # Database seeding script
│
├── public/
│   └── ...                  # Static assets
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Auth route group
│   │   │   ├── sign-in/     # Sign in page
│   │   │   └── sign-up/     # Sign up page
│   │   ├── add-product/     # Add new product page
│   │   ├── api/             # API routes (Better Auth handler)
│   │   ├── dashboard/       # Main dashboard
│   │   ├── departments/     # Department overview
│   │   ├── inventory/       # Product inventory
│   │   │   └── [id]/        # Product detail & edit
│   │   ├── settings/        # User settings
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   │
│   ├── components/
│   │   ├── auth/            # Auth-related components
│   │   ├── form/            # Form components
│   │   │   ├── add-product-form.tsx
│   │   │   └── settings-form.tsx
│   │   ├── layout/          # Layout components
│   │   ├── products/        # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductSearchBar.tsx
│   │   │   └── ProductEmptyState.tsx
│   │   ├── ui/              # Reusable UI components
│   │   ├── pagination.tsx   # Pagination component
│   │   ├── pie-chart.tsx    # Chart component
│   │   ├── product-actions.tsx  # Edit/Delete actions
│   │   ├── products.tsx     # Product list container
│   │   ├── sidebar.tsx      # Navigation sidebar
│   │   └── userBlock.tsx    # User info component
│   │
│   ├── generated/
│   │   └── prisma/          # Prisma generated client (custom output path)
│   │
│   ├── lib/
│   │   ├── actions/         # Server Actions
│   │   │   ├── product.ts   # Product CRUD actions
│   │   │   └── user.ts      # User profile actions
│   │   ├── auth.ts          # Better Auth config
│   │   ├── auth-client.ts   # Auth client
│   │   ├── cloudinary.ts    # Cloudinary config
│   │   ├── prisma.ts        # Prisma client (pg driver adapter)
│   │   ├── session.ts       # Session utilities
│   │   ├── utils.ts         # Helper functions
│   │   └── validation.ts    # Zod schemas
│   │
│   └── types/
│       └── product.ts       # TypeScript types
│
├── .dockerignore            # Docker build ignore rules
├── .env.example             # Environment variable template
├── Dockerfile               # Production multi-stage build
├── Dockerfile.dev           # Development image
├── docker-compose.yml       # Production Compose (external DB)
├── docker-compose.dev.yml   # Dev Compose (local PostgreSQL + Prisma Studio)
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies & scripts
├── prisma.config.ts         # Prisma CLI configuration (datasource URL)
├── postcss.config.mjs       # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 📊 Database Schema

The application uses a **per-user, multi-tenant** architecture where all data is scoped to the authenticated user. Departments and Suppliers are **relational models** (not hard-coded enums), giving users full flexibility to create and manage their own categories.

### Core Models

```
User
├── Session[]       — Active user sessions
├── Account[]       — OAuth provider links (GitHub, Google)
├── Verification[]  — Email verification tokens (managed by Better Auth)
├── Product[]       — User-owned products
├── Department[]    — User-created departments (e.g. Kitchen, Electronics)
└── Supplier[]      — User-managed suppliers

Department
├── id, name, userId
└── Product[]       — Products in this department

Supplier
├── id, name, email?, phone?, address?, userId
└── Product[]       — Products from this supplier

Product
├── id, name, description?, price, stock, delivered, sku, imageUrl?
├── userId          — Owner
├── departmentId    — FK → Department
└── supplierId      — FK → Supplier
```

> **SKU uniqueness** is enforced per user (`@@unique([sku, userId])`). Department and Supplier names are also unique per user.

---

## 📜 Available Scripts

| Command                       | Description                          |
| ----------------------------- | ------------------------------------ |
| `npm run dev`                 | Start development server             |
| `npm run build`               | Build for production                 |
| `npm run start`               | Start production server              |
| `npm run lint`                | Run ESLint                           |
| `npx prisma migrate dev`      | Run & generate a new migration       |
| `npx prisma migrate deploy`   | Apply pending migrations (prod)      |
| `npx prisma db seed`          | Seed the database                    |
| `npx prisma generate`         | Regenerate Prisma client             |
| `npx prisma studio`           | Open Prisma Studio GUI               |

### Docker Commands

| Command                                                    | Description                        |
| ---------------------------------------------------------- | ---------------------------------- |
| `docker compose -f docker-compose.dev.yml up --build`      | Start full dev stack               |
| `docker compose -f docker-compose.dev.yml down -v`         | Stop dev stack & remove volumes    |
| `docker compose up --build -d`                             | Start production stack             |
| `docker compose down`                                      | Stop production stack              |

---

## 🔒 Authentication Flow

1. **Registration**: Users sign up with email/password or OAuth (GitHub/Google)
2. **Validation**: Passwords require uppercase, lowercase, numbers, and special characters
3. **Email Verification**: Verification tokens are stored in the `verification` table and managed automatically by Better Auth
4. **Session Management**: Sessions are stored in the database with automatic expiry
5. **Protected Routes**: All app routes verify the session server-side before rendering

---

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, minimalist interface with purple accent colors
- **Consistent Styling**: Unified design language across all pages
- **Loading States**: Skeleton loaders and transitions for better UX
- **Toast Notifications**: Success/error feedback using Sonner
- **Responsive Tables**: Adapted views for mobile and desktop
- **Interactive Charts**: Visual data representation for quick insights

---

## 🛡️ Security Features

- **Input Sanitization**: All inputs validated with Zod schemas
- **Image URL Validation**: HTTPS-only image URLs with blocked hosts
- **Session Verification**: Server-side session checks on every request
- **Secure Password Hashing**: Handled by Better Auth
- **CSRF Protection**: Built into Next.js Server Actions
- **Database Constraints**: Unique constraints to prevent duplicate SKUs, departments, and suppliers
- **Non-root Container**: Production Docker image runs as a dedicated `nextjs` user

---

## 🚧 Future Enhancements

- [ ] Export inventory to CSV/Excel
- [ ] Bulk product import
- [ ] Advanced reporting and analytics
- [ ] Inventory history and audit logs
- [ ] Multi-warehouse support
- [ ] Barcode/QR code scanning
- [ ] Email notifications for low stock
- [ ] Role-based access control (Admin/Staff)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Joe John**

- GitHub: [@joejohn98](https://github.com/joejohn98)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ using Next.js and React

</div>
