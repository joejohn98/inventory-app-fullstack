# 📦 Inventory Hub

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, full-stack inventory management system built with Next.js 16 and React 19**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🔐 Authentication & Security

- **Multiple Auth Methods**: Email/password registration and social login (GitHub, Google)
- **Secure Sessions**: Session-based authentication powered by Better Auth
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

### 🏢 Department Organization

- **Category Management**: Organize products into Kitchen, Electronics, Clothing, and Toys
- **Department Overview**: Visual cards showing stock levels per department
- **Quick Navigation**: Jump directly to department-filtered inventory views

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

| Technology              | Version | Purpose                         |
| ----------------------- | ------- | ------------------------------- |
| **Next.js**             | 16.1.1  | React framework with App Router |
| **React**               | 19.2.3  | UI library with latest features |
| **TypeScript**          | 5.x     | Type-safe development           |
| **TailwindCSS**         | 4.x     | Utility-first styling           |
| **Lucide React**        | 0.562.0 | Beautiful icon library          |
| **React Hook Form**     | 7.70.0  | Performant form handling        |
| **Sonner**              | 2.0.7   | Toast notifications             |
| **React Google Charts** | 5.2.1   | Data visualization              |

### Backend

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| **Prisma**      | 7.2.0   | Type-safe database ORM  |
| **PostgreSQL**  | -       | Relational database     |
| **Better Auth** | 1.4.10  | Authentication solution |
| **Zod**         | 4.3.5   | Schema validation       |
| **Cloudinary**  | 2.8.0   | Image hosting & CDN     |

### Developer Experience

| Technology               | Purpose                 |
| ------------------------ | ----------------------- |
| **ESLint**               | Code linting            |
| **Babel React Compiler** | Automatic optimizations |
| **PostCSS**              | CSS processing          |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or hosted)
- **Cloudinary** account for image uploads

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/inventory-fullstack.git
   cd inventory-fullstack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

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
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npm run db:seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
inventory-fullstack/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
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
│   │   ├── api/             # API routes
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
│   ├── generated/           # Prisma generated types
│   │
│   ├── lib/
│   │   ├── actions/         # Server Actions
│   │   │   ├── product.ts   # Product CRUD actions
│   │   │   └── user.ts      # User actions
│   │   ├── auth.ts          # Better Auth config
│   │   ├── auth-client.ts   # Auth client
│   │   ├── cloudinary.ts    # Cloudinary config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── session.ts       # Session utilities
│   │   ├── utils.ts         # Helper functions
│   │   └── validation.ts    # Zod schemas
│   │
│   └── types/
│       └── product.ts       # TypeScript types
│
├── .env                     # Environment variables
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies & scripts
├── prisma.config.ts         # Prisma configuration
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 📊 Database Schema

The application uses a multi-tenant architecture where each user has isolated data:

### Core Models

```prisma
User          # User accounts with auth data
├── Session   # User sessions
├── Account   # OAuth provider accounts
├── Product   # User's products (many)
├── Department # User's departments (many)
└── Supplier  # User's suppliers (many)

Product
├── name, description, price, stock, sku
├── imageUrl (Cloudinary)
├── delivered (total delivered count)
├── Department (relation)
└── Supplier (relation)

Department (Enum)
├── Kitchen
├── Electronics
├── Clothing
└── Toys
```

---

## 📜 Available Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run start`          | Start production server  |
| `npm run lint`           | Run ESLint               |
| `npx prisma studio`      | Open Prisma Studio GUI   |
| `npx prisma migrate dev` | Run database migrations  |
| `npx prisma generate`    | Generate Prisma client   |

---

## 🔒 Authentication Flow

1. **Registration**: Users can sign up with email/password or OAuth (GitHub/Google)
2. **Validation**: Passwords require uppercase, lowercase, numbers, and special characters
3. **Session Management**: Sessions are stored in the database with automatic expiry
4. **Protected Routes**: All app routes verify session before rendering

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
- **Database Constraints**: Unique constraints to prevent duplicates

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
