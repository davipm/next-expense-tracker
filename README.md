# 🧾 Next Expense Tracker Application

A modern, full-stack expense tracking application built with Next.js 15, React 19, and Prisma.

## 🚀 Tech Stack

### Frontend & Backend
- **[Next.js 16](https://nextjs.org/)** - React framework with hybrid static & server rendering
- **[React 19](https://react.dev/)** - Latest React with hooks and concurrent features
- **[oRPC](https://orpc.dev/)** - Type-safe API framework
- **[Zod](https://zod.dev/)** - TypeScript-first schema declaration and validation
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant, flexible forms with easy validation

### Database & ORM
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open-source relational database

### Monorepo Tools
- **[TurboRepo](https://turbo.build/)** - High-performance build system for JavaScript/TypeScript monorepos
- **[npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - Built-in monorepo support

## 📁 Project Structure

```
├── 📁 app/                 # Next.js app router directory
├── 📁 components/          # Reusable UI components
├── 📁 hooks/               # Custom React hooks
├── 📁 lib/                 # Utility functions
├── 📁 prisma/              # Prisma schema and migrations
├── 📁 providers/           # React context providers
├── 📁 public/              # Static assets
├── 📁 server/              # Server-side logic and oRPC routers
├── 📁 utils/               # Helper functions
├── 📄 next.config.ts       # Next.js configuration
├── 📄 package.json         # Project dependencies and scripts
└── 📄 README.md            # This file
```

## 🛠️ Prerequisites

- **Node.js** >= 20.x
- **npm** >= 8.x
- **Docker** (optional, for containerized deployment)

## ▶️ Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd next-expense-tracker

# Install dependencies
npm install
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### Development

```bash
# Start the Next.js application in development mode
npm run dev
```

Application will be available at:
- **Application**: http://localhost:3000

## 🐳 Docker Deployment

### Development with Docker

```bash
# Start the database service
docker-compose up -d

# Start the full application stack in development mode
docker-compose -f docker-compose.full.yml up --build

# Start services in detached mode
docker-compose -f docker-compose.full.yml up -d

# Stop all services
docker-compose -f docker-compose.full.yml down
```

### Using Docker for Database Only

```bash
# Start only the PostgreSQL database
docker-compose up -d

# Then run the Next.js application locally
npm run dev
```

## 📦 Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js application in development mode |
| `npm run build` | Build the Next.js application |
| `npm run start` | Start the production built application |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed the database |

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database connection
DATABASE_URL=postgresql://postgres:password@localhost:5432/transaction-db?schema=public
```

## 👥 Authors

- Davi Pereira - Initial work
