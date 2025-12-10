# Nuxt 4 Scaffolding Project

**A production-ready Nuxt 4 starter template** designed to speed up new project development. This scaffolding includes authentication, database integration, UI components, and best practices out of the box.

> 🚀 **Quick Start**: Clone this template and have a full-stack application running in minutes, not hours.

## Why This Scaffolding?

Starting a new Nuxt project often means spending hours setting up the same foundational pieces: authentication, database, UI components, form validation, and more. This template provides all of that pre-configured and ready to extend.

**What's Included:**

- ✅ Complete authentication system (sign up, sign in, protected routes)
- ✅ Database integration with type-safe ORM
- ✅ Pre-built UI components with accessibility
- ✅ Form validation patterns
- ✅ API endpoint examples
- ✅ Responsive layouts
- ✅ TypeScript throughout
- ✅ Production best practices

## Tech Stack

| Layer               | Technology                                  | Version    |
| ------------------- | ------------------------------------------- | ---------- |
| **Framework**       | [Nuxt 4](https://nuxt.com/)                 | v4.2.2     |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)    | v4.1.17    |
| **UI Components**   | [Reka UI](https://reka-ui.com/)             | v2.6.1     |
| **Database ORM**    | [Drizzle ORM](https://orm.drizzle.team/)    | v0.45.0    |
| **Database**        | [Neon PostgreSQL](https://neon.tech/)       | Serverless |
| **Authentication**  | [Better Auth](https://www.better-auth.com/) | v1.4.6     |
| **Form Validation** | vee-validate + Yup                          | Latest     |
| **TypeScript**      | Full type safety                            | Latest     |

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** or **20+** installed ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **Neon database account** ([Sign up free](https://neon.tech/))

## Quick Setup

### 1. How to use This Template

```bash
mkdir -p my-app
cd my-app
TMPDIR=$(mktemp -d)
git clone --depth=1 git@github.com:oscarprdev/nuxt-scafolding.git "$TMPDIR/nuxt-scafolding"
rm -rf "$TMPDIR/nuxt-scafolding/.git"   # remove its Git metadata so it won't be a submodule
mv "$TMPDIR/nuxt-scafolding" my-app
git add .
git commit -m "Add apps/web from oscarprdev/nuxt-scafolding (vendored, no history)
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create your environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Neon Database Connection
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Better Auth Configuration
BETTER_AUTH_SECRET=your-random-secret-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
```

#### 🔑 Getting Your Neon Database URL

1. Visit [Neon Console](https://console.neon.tech/)
2. Create a new project (free tier available)
3. Copy the connection string from your dashboard
4. Paste it as your `DATABASE_URL`

#### 🔐 Generating Better Auth Secret

Generate a secure random key (minimum 32 characters):

```bash
# Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Or use an online generator: [generate-secret.now.sh/32](https://generate-secret.now.sh/32)

### 4. Set Up Database

Initialize your database with the required tables:

```bash
# Push schema to database (recommended for initial setup)
pnpm db:push
```

For production or team environments, use migrations:

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application! 🎉

### 6. Test Authentication

1. Click **Sign Up** and create an account
2. Sign in with your credentials
3. Access the protected **Dashboard** page
4. Update your profile information

Your scaffolding is now ready for development!

---

## Project Structure Overview

This scaffolding uses a clean, organized structure optimized for scalability:

```
app/                    # Frontend application
├── components/         # Vue components (auto-imported)
│   ├── forms/         # Form components
│   ├── ui/            # Shared UI components
│   └── [page]/        # Page-specific components
├── composables/        # Composables (useAuth, etc.)
├── pages/             # File-based routing
├── layouts/           # Layouts
└── middleware/        # Route protection

server/                 # Backend API
├── api/               # API endpoints
│   ├── auth/         # Better Auth routes
│   └── [resource]/   # Resource endpoints
├── database/          # Drizzle ORM
│   ├── schema.ts     # Database schema
│   └── migrations/   # Database migrations
└── utils/            # Server utilities
```

> 📘 **For detailed development guidelines**, see **[CLAUDE.md](./CLAUDE.md)** - Complete guide on adding components, pages, API endpoints, and more.

---

## Available Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | Start development server at `localhost:3000` |
| `pnpm build`       | Build for production                         |
| `pnpm preview`     | Preview production build locally             |
| `pnpm db:generate` | Generate database migrations                 |
| `pnpm db:migrate`  | Run database migrations                      |
| `pnpm db:push`     | Push schema directly to database (dev)       |
| `pnpm db:studio`   | Open Drizzle Studio (database GUI)           |
| `pnpm format`      | Format code with Prettier                    |

---

## What's Included

### 🔐 Authentication System

- Complete email/password authentication with Better Auth
- Pre-built sign-up and sign-in forms with validation
- Protected routes using middleware
- Session management
- User profile management
- `useAuth()` composable for easy integration

### 🗄️ Database Integration

- Drizzle ORM with full TypeScript support
- Serverless PostgreSQL via Neon
- Pre-configured schema with Better Auth tables
- Migration system for schema changes
- Example API endpoints for CRUD operations

### 🎨 UI Components & Styling

- Tailwind CSS 4 for utility-first styling
- Reka UI for accessible, unstyled components
- Pre-built components: buttons, dialogs, forms
- Responsive layouts
- Form validation with vee-validate + Yup
- CVA (Class Variance Authority) for component variants

### 📁 Organized Structure

- Component organization by type and scope
- Auto-importing for components and composables
- File-based routing with Nuxt
- RESTful API endpoint patterns
- TypeScript throughout

---

## Development Guide

Ready to start building? Check out these resources:

- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive development guide
  - How to add components, pages, and API endpoints
  - Database patterns and best practices
  - Form validation patterns
  - Styling guidelines
  - Common patterns and examples

---

## Customizing for Your Project

This is a **scaffolding project**, so feel free to:

1. **Remove unused features** - Don't need authentication? Remove it!
2. **Add new features** - Follow the patterns in CLAUDE.md
3. **Customize styling** - Update Tailwind config and component themes
4. **Change database** - Drizzle supports PostgreSQL, MySQL, SQLite
5. **Add OAuth providers** - Better Auth supports many providers
6. **Extend the schema** - Add your own database tables

The goal is to give you a solid foundation, not to be prescriptive.

---

## Production Deployment

### Environment Variables

Ensure these are set in production:

```env
DATABASE_URL=your_production_database_url
BETTER_AUTH_SECRET=your_production_secret_min_32_chars
BETTER_AUTH_URL=https://your-domain.com
```

### Build and Deploy

```bash
# Build for production
pnpm build

# Preview locally
pnpm preview
```

Deploy to your preferred platform:

- **Vercel** - Zero config deployment
- **Netlify** - Nuxt support built-in
- **Cloudflare Pages** - Edge deployment
- **Digital Ocean** - VPS deployment

See [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment) for platform-specific guides.

---

## Learn More

### Framework & Libraries Documentation

- [Nuxt 4 Documentation](https://nuxt.com/docs) - Vue.js framework
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [Reka UI Documentation](https://reka-ui.com/) - Accessible Vue components
- [Drizzle ORM Documentation](https://orm.drizzle.team/) - TypeScript ORM
- [Better Auth Documentation](https://www.better-auth.com/) - Authentication
- [Neon Documentation](https://neon.tech/docs) - Serverless PostgreSQL

### Project Documentation

- [CLAUDE.md](./CLAUDE.md) - Development guide
- [AUTHENTICATION.md](./AUTHENTICATION.md) - Auth implementation details
- [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Component organization

---

## Contributing

This scaffolding is meant to be copied and customized for your projects. If you find improvements that would benefit others:

1. Fork this repository
2. Make your improvements
3. Submit a pull request

---

## License

MIT License - Feel free to use this scaffolding for any project.

---

**Happy building!** 🚀 If you have questions or run into issues, check [CLAUDE.md](./CLAUDE.md) for detailed guides on common tasks.
