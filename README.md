# 🧾 Expense Tracker Application

A modern, full-stack expense tracking application built with a monorepo architecture using cutting-edge technologies.

![Project Screenshot](#) <!-- You can add actual screenshots here -->

## 🚀 Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Latest React with hooks and concurrent features
- **[Vite](https://vitejs.dev/)** - Ultra-fast build tool and development server
- **[React Router v7](https://reactrouter.com/)** - Declarative routing for React
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant, flexible forms with easy validation

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js v5](https://expressjs.com/)** - Fast, unopinionated web framework
- **[oRPC](https://orpc.dev/)** - Type-safe API framework
- **[Zod](https://zod.dev/)** - TypeScript-first schema declaration and validation

### Database & ORM
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight database engine

### Monorepo Tools
- **[TurboRepo](https://turbo.build/)** - High-performance build system for JavaScript/TypeScript monorepos
- **[npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - Built-in monorepo support

## 📁 Project Structure

```
├── 📁 apps/
│   ├── 📁 server/          # Express.js backend with oRPC
│   └── 📁 web/             # React frontend with Vite
├── 📁 packages/
│   ├── 📁 api/             # Shared API contracts and procedures
│   └── 📁 db/              # Prisma database client and schema
├── 📄 turbo.json           # Turborepo configuration
├── 📄 package.json         # Root package.json with workspaces
└── 📄 README.md            # This file
```

## 🛠️ Prerequisites

- **Node.js** >= 18.x
- **npm** >= 8.x
- **Docker** (optional, for containerized deployment)

## ▶️ Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-context-node-payment

# Install dependencies
npm install
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### Development

```bash
# Start both frontend and backend in development mode
npm run dev

# Or start individual services
npm run dev:server    # Start only the backend server
npm run dev:web       # Start only the frontend application
```

Your application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🐳 Docker Deployment

### Development with Docker

```bash
# Build and start all services
docker-compose up --build

# Start services in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

### Production Deployment

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up --build
```

## 📦 Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start all services in development mode |
| `npm run build` | Build all packages |
| `npm run dev:server` | Start only the backend server |
| `npm run dev:web` | Start only the frontend application |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database connection
DATABASE_URL=file:./dev.db

# Server configuration
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Davi Pereira - Initial work
