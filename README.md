# Nuxt 4 Scaffolding Project

A modern full-stack Nuxt 4 application with a complete tech stack including Tailwind CSS, Reka UI, Drizzle ORM, Neon Database, and Better Auth.

## Tech Stack

- **[Nuxt 4](https://nuxt.com/)** (v4.2.2) - The Intuitive Vue Framework
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.1.17) - Utility-first CSS framework
- **[Reka UI](https://reka-ui.com/)** (v2.6.1) - Unstyled, accessible Vue components
- **[Drizzle ORM](https://orm.drizzle.team/)** (v0.45.0) - TypeScript ORM
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL
- **[Better Auth](https://www.better-auth.com/)** (v1.4.6) - Modern authentication for TypeScript

## Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm/yarn
- A Neon database account

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Copy the `.env.example` file to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Neon Database URL
DATABASE_URL=postgresql://user:password@host/database

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_min_32_characters
BETTER_AUTH_URL=http://localhost:3000
```

#### Getting Neon Database URL:

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project or select an existing one
3. Copy the connection string from the dashboard

#### Setting Up Better Auth Secret:

Generate a random secret key (minimum 32 characters). You can use:

```bash
openssl rand -base64 32
```

Or generate one online at [generate-secret.now.sh](https://generate-secret.now.sh/32)

### 3. Database Setup

Generate and run database migrations:

```bash
# Generate migrations from schema
pnpm db:generate

# Push schema to database
pnpm db:push

# Or run migrations
pnpm db:migrate
```

### 4. Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Project Structure

> **📖 See [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) for detailed component organization guidelines**

```
app/
├── components/        # Vue components (organized by type)
│   ├── forms/        # Form components (dash-case.vue)
│   │   └── user-profile-form.vue  # User profile update form
│   ├── ui/           # Shared UI components (dash-case.vue)
│   │   └── example-dialog.vue     # Reka UI dialog example
│   └── dashboard/    # Dashboard-specific components (dash-case.vue)
├── composables/       # Vue composables
│   └── useAuth.ts     # Authentication composable
├── layouts/          # Nuxt layouts
│   └── default.vue    # Default layout with auth
├── lib/
│   └── auth-client.ts # Better Auth client setup
├── middleware/       # Route middleware
│   └── auth.ts        # Authentication middleware
├── pages/            # File-based routing
│   ├── index.vue      # Home page
│   ├── dashboard.vue  # Protected dashboard
│   ├── sign-in.vue    # Sign in page
│   └── sign-up.vue    # Sign up page
└── app.vue           # Root component

server/
├── api/              # API routes
│   ├── auth/
│   │   └── [...all].ts  # Better Auth API handler
│   ├── user/
│   │   ├── profile.get.ts  # Get user profile
│   │   └── update.patch.ts # Update user profile
│   └── users.get.ts  # Get all users (example)
├── database/
│   ├── schema.ts     # Drizzle schema (Better Auth tables)
│   └── index.ts      # Database connection
├── lib/
│   └── auth.ts       # Better Auth server configuration
└── utils/
    └── auth.ts       # Server auth utilities
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Drizzle Studio
```

## Features

### Authentication with Better Auth

- Email and password authentication
- Custom sign in/sign up forms
- Protected routes with middleware
- Session management
- User profile management
- User information display
- Secure password hashing
- Database-backed authentication
- Server-side session validation
- `useAuth()` composable for easy access

**📖 [Complete Authentication Guide](./AUTHENTICATION.md)**

### Database with Drizzle & Neon

- Type-safe database queries
- Migration system
- Better Auth compatible schema
- API endpoint examples
- Serverless PostgreSQL with Neon

### UI Components

- Tailwind CSS for styling
- Reka UI for accessible components
- Organized component structure (forms/, ui/, [page-name]/)
- All components use dash-case.vue naming
- Script-first component structure
- Responsive layout
- Custom authentication forms with vee-validate

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Reka UI Documentation](https://reka-ui.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Documentation](https://neon.tech/docs)
- [Better Auth Documentation](https://www.better-auth.com/)
