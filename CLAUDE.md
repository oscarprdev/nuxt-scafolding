# Claude Development Guide

Concise guidelines for working with this Nuxt 4 scaffolding project.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Adding Components](#adding-components)
- [Adding Pages](#adding-pages)
- [Adding API Endpoints](#adding-api-endpoints)
- [Working with the Database](#working-with-the-database)
- [Adding Forms](#adding-forms)
- [Styling Guidelines](#styling-guidelines)
- [Authentication Patterns](#authentication-patterns)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

---

## Folder Structure

### App Directory (`app/`)

```
app/
├── assets/css/index.css       # Tailwind imports only
├── components/
│   ├── forms/                 # Form components
│   ├── ui/                    # Shared UI components
│   └── [page-name]/           # Page-specific components
├── composables/               # Auto-imported
├── layouts/
├── lib/                       # Client utilities
├── middleware/
├── pages/                     # File-based routing
└── app.vue
```

### Server Directory (`server/`)

```
server/
├── api/                       # API routes
│   ├── auth/[...all].ts
│   └── [resource]/
├── database/
│   ├── schema.ts
│   ├── index.ts
│   ├── migrations/
│   └── auth.ts
├── middleware/
└── utils/
```

---

## Naming Conventions

### Files and Directories

- Components: `dash-case.vue`
- Pages: `dash-case.vue` or `[param].vue`
- Composables: `camelCase.ts` with `use` prefix
- API Routes: `[name].[method].ts`
- Directories: `dash-case`

### Code

- Components in templates: `PascalCase`
- Variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- Functions: `camelCase`

### Component Organization

Auto-imported using directory + filename:
- `components/forms/sign-in-form.vue` → `<FormsSignInForm />`
- `components/ui/button.vue` → `<UiButton />`
- `components/dashboard/stats-card.vue` → `<DashboardStatsCard />`

---

## Adding Components

### 1. UI Components (`components/ui/`)

**Requirements**:
- Create: `app/components/ui/[component-name].vue`
- Use Reka UI primitives for accessibility
- Define variants using CVA in `app/components/ui/theme/[component-name].ts`
- Type props with TypeScript
- Use `cn()` helper for conditional classes

**Examples**:
- [`app/components/button.vue`](app/components/button.vue)
- [`app/components/alert.vue`](app/components/alert.vue)
- [`app/components/input.vue`](app/components/input.vue)

### 2. Form Components (`components/forms/`)

**Requirements**:
- Create: `app/components/forms/[form-name]-form.vue`
- Use `vee-validate` + `yup` for validation
- Include loading states, error handling, success messages
- Use `defineField`, `handleSubmit`, `errors` from `useForm`
- State management: `{ loading, error, success }`

**Examples**:
- [`app/components/forms/sign-in-form.vue`](app/components/forms/sign-in-form.vue)
- [`app/components/forms/sign-up-form.vue`](app/components/forms/sign-up-form.vue)

### 3. Page-Specific Components

**Requirements**:
- Create: `app/components/[page-name]/[component-name].vue`
- Use as `<PageNameComponentName />`

---

## Adding Pages

**Requirements**:
- File-based routing in `app/pages/`
- Use `definePageMeta` for layout/middleware
- Use `useSeoMeta` for SEO
- Protected pages: add `middleware: 'auth'`
- Dynamic routes: `[param].vue`

**Examples**:
- [`app/pages/index.vue`](app/pages/index.vue)
- [`app/pages/dashboard.vue`](app/pages/dashboard.vue) (protected)

---

## Adding API Endpoints

**Naming**: `[route-name].[http-method].ts`

**Requirements**:
- Use `defineEventHandler`
- Get params: `getRouterParam(event, 'id')`
- Get body: `await readBody(event)`
- Get query: `getQuery(event)`
- Validate with Zod
- Protected: use `requireAuth(event)` or `getServerSession(event)`
- Errors: `throw createError({ statusCode, message })`

**Examples**:
- [`server/api/users.get.ts`](server/api/users.get.ts)
- [`server/api/user/profile.get.ts`](server/api/user/profile.get.ts) (protected)
- [`server/api/user/update.patch.ts`](server/api/user/update.patch.ts) (with body)

---

## Working with the Database

**Stack**: Drizzle ORM + Neon (PostgreSQL)

### Schema

**Requirements**:
- Define in `server/database/schema.ts`
- Use `pgTable` from `drizzle-orm/pg-core`
- Always include `createdAt`, `updatedAt` timestamps
- Define relations with `relations()`

**Example**: [`server/database/schema.ts`](server/database/schema.ts)

### Migrations

```bash
pnpm db:generate    # Generate migrations
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema (dev only)
```

### Querying

**Requirements**:
- Import: `useDatabase()`, `eq`, `and`, `desc` from `drizzle-orm`
- Import table from schema
- CRUD: `select()`, `insert()`, `update()`, `delete()`
- Relations: use `db.query.[table].findMany({ with: { relation: true } })`

**Example**: [`server/api/users.get.ts`](server/api/users.get.ts)

---

## Adding Forms

**Requirements**:
- Use `vee-validate` + `yup`
- Schema: `yup.object({ field: yup.string().required() })`
- Form setup: `useForm({ validationSchema })`
- Fields: `defineField('fieldName')`
- Submit: `handleSubmit(async values => { ... })`
- State: `{ loading, error, success }`
- Error display: show `errors.fieldName` below inputs
- Success/error messages: show in `state.success`/`state.error`

**Validation patterns**:
- Required: `.required('Message')`
- Email: `.email('Invalid email')`
- Min/Max: `.min(8)`, `.max(100)`
- Password match: `.oneOf([yup.ref('password')])`
- URL: `.url()`
- Optional: `.optional()`

**Examples**:
- [`app/components/forms/sign-in-form.vue`](app/components/forms/sign-in-form.vue)
- [`app/components/forms/user-profile-form.vue`](app/components/forms/user-profile-form.vue)

---

## Styling Guidelines

**Tailwind CSS 4**: Utility-first approach

### Core Principles

- Use Tailwind utilities directly in templates
- No custom CSS unless absolutely necessary
- Use `cn()` helper for conditional classes (from `~/lib/utils`)

### Color Palette

**Primary**: `bg-indigo-600 hover:bg-indigo-500`, `text-indigo-600`
**Neutral**: `bg-gray-50`, `bg-gray-100`, `text-gray-900`, `text-gray-600`, `border-gray-300`
**Semantic**: `bg-red-600`, `bg-green-600`, `bg-yellow-600`

### Common Patterns

- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Card: `rounded-lg bg-white p-6 shadow`
- Button: `rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500`
- Input: `block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1`
- Grid: `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
- Flex: `flex items-center justify-between`

### Responsive

Mobile-first: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

**Example**: See any component in [`app/components/`](app/components/)

---

## Authentication Patterns

### Client-side

**Requirements**:
- Composable: `useAuth()` (auto-imported)
- Returns: `{ user, isAuthenticated, login, logout }`
- Check auth: `v-if="isAuthenticated"`
- Login: `await login(email, password)`
- Logout: `await logout()`

**Example**: [`app/composables/useAuth.ts`](app/composables/useAuth.ts)

### Route Protection

**Requirements**:
- Add `middleware: 'auth'` to `definePageMeta`

**Example**: [`app/pages/dashboard.vue`](app/pages/dashboard.vue)

### Server-side

**Requirements**:
- Import: `requireAuth` or `getServerSession` from `~/server/utils/auth`
- Require auth: `const session = await requireAuth(event)` (throws 401)
- Optional auth: `const session = await getServerSession(event)` (returns null)

**Example**: [`server/api/user/profile.get.ts`](server/api/user/profile.get.ts)

---

## Common Patterns

### Loading States

**Requirements**:
- Manual: `ref({ loading, data, error })`
- Automatic: `useFetch('/api/endpoint')` returns `{ data, pending, error, refresh }`

**Example**: [`app/pages/dashboard.vue`](app/pages/dashboard.vue)

### Composables

**Requirements**:
- Create: `app/composables/use[Name].ts`
- Export function: `export function use[Name]() { ... }`
- Return: `{ data: readonly(data), methods }`
- Auto-imported

**Example**: [`app/composables/useAuth.ts`](app/composables/useAuth.ts)

---

## Best Practices

### Component Design

- Single Responsibility: one thing well
- Props over State: prefer props for data flow
- Emit Events: child-to-parent communication
- Composables for Logic: extract reusable logic
- TypeScript: always type props, emits, composables

### Performance

- Lazy Load: `defineAsyncComponent` for large components
- SSR: use `useFetch` for better SEO
- Debounce: `useDebounceFn` for search inputs
- Pagination: don't load all data at once
- Images: use `<NuxtImg>`

### Security

- Validate Inputs: Zod/Yup for API validation
- Sanitize: never trust user input
- HTTPS: always in production
- CSRF: Better Auth handles this
- SQL Injection: Drizzle prevents by default
- Rate Limiting: consider for production

### Code Quality

- Consistent Naming: follow conventions
- Component Structure: Script → Template → Style
- No Inline Styles: Tailwind only
- Error Handling: handle errors gracefully
- Loading States: show feedback for async ops
- Accessibility: semantic HTML + ARIA

### Database

- Indexes: add for frequently queried columns
- Migrations: always use, never modify schema directly in production
- Transactions: use for multiple related operations
- Soft Deletes: consider `deletedAt` vs hard deletes
- Timestamps: always `createdAt`, `updatedAt`

### Git Workflow

- Descriptive Commits: clear messages
- Feature Branches: branch for new features
- Pull Requests: review before merge
- Environment Files: never commit `.env`
- Lock Files: commit `pnpm-lock.yaml`

---

## Quick Reference

### Import Paths

```typescript
// Components (auto-imported)
<UiButton />

// Composables (auto-imported)
const { user } = useAuth()

// Utils
import { cn } from '~/lib/utils'

// API
const data = await $fetch('/api/endpoint')

// Navigation
await navigateTo('/dashboard')

// Database
import { useDatabase } from '~/server/database'
import { usersTable } from '~/server/database/schema'
import { eq, and, or, desc } from 'drizzle-orm'
```

### Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev only)
pnpm db:studio        # Open Drizzle Studio

# Code Quality
pnpm format           # Format with Prettier
pnpm lint             # Lint with ESLint
```

---

## Documentation Links

- [Nuxt 4 Docs](https://nuxt.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://www.better-auth.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Reka UI](https://reka-ui.com/)

---

**Code Style**: No comments. Clear namings. Extremely concise. Reduce grammar for concision.
