# Claude Development Guide

This document provides comprehensive guidelines for working with this Nuxt 4 scaffolding project. Use this as a reference when adding features, components, pages, or API endpoints.

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

Frontend application code with the following organization:

```
app/
├── assets/
│   └── css/
│       └── index.css          # Global styles (Tailwind imports only)
├── components/
│   ├── forms/                 # Form components
│   ├── ui/                    # Shared UI components
│   ├── dashboard/             # Dashboard-specific components
│   └── [page-name]/           # Page-specific components (e.g., profile/, settings/)
├── composables/               # Vue composables (auto-imported)
│   └── useAuth.ts
├── layouts/
│   └── default.vue            # Default layout
├── lib/                       # Client-side utilities
│   ├── auth-client.ts         # Better Auth client
│   └── utils.ts               # Helper functions (cn, etc.)
├── middleware/                # Route middleware
│   └── auth.ts
├── pages/                     # File-based routing
│   ├── index.vue
│   ├── dashboard.vue
│   └── [dynamic].vue
└── app.vue                    # Root component
```

### Server Directory (`server/`)

Backend/API code with the following organization:

```
server/
├── api/                       # API routes
│   ├── auth/
│   │   └── [...all].ts        # Better Auth handler
│   ├── [resource]/            # Resource-based organization
│   │   ├── index.get.ts       # GET /api/[resource]
│   │   ├── [id].get.ts        # GET /api/[resource]/:id
│   │   ├── index.post.ts      # POST /api/[resource]
│   │   └── [id].patch.ts      # PATCH /api/[resource]/:id
│   └── user/
│       ├── profile.get.ts
│       └── update.patch.ts
├── database/
│   ├── schema.ts              # Drizzle ORM schema
│   ├── index.ts               # Database connection
│   ├── migrations/            # Auto-generated migrations
│   └── auth.ts                # Better Auth config
├── middleware/                # Server middleware
└── utils/                     # Server utilities
    └── auth.ts                # Auth helpers
```

---

## Naming Conventions

### Files and Directories

- **Components**: `dash-case.vue` (e.g., `user-profile-form.vue`)
- **Pages**: `dash-case.vue` or `[param].vue` for dynamic routes
- **Composables**: `camelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
- **API Routes**: `[name].[method].ts` (e.g., `profile.get.ts`, `update.patch.ts`)
- **Directories**: `dash-case` (e.g., `user-settings/`)

### Code

- **Components in templates**: `PascalCase` (e.g., `<UiButton>`, `<FormsSignInForm>`)
- **Variables**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Functions**: `camelCase`

### Component Organization

Components are organized by **type** and **scope**:

- `components/forms/` - All form components
- `components/ui/` - Shared UI primitives
- `components/[page-name]/` - Page-specific components (e.g., `dashboard/`, `profile/`)

**Usage**: Components are auto-imported. Use directory + filename in PascalCase:

- `components/forms/sign-in-form.vue` → `<FormsSignInForm />`
- `components/ui/button.vue` → `<UiButton />`
- `components/dashboard/stats-card.vue` → `<DashboardStatsCard />`

---

## Adding Components

### 1. UI Components (`components/ui/`)

For reusable, shared UI primitives (buttons, dialogs, inputs, etc.).

**Steps**:

1. Create the component file: `app/components/ui/[component-name].vue`
2. Use Reka UI primitives when possible for accessibility
3. Define variants using CVA in `app/components/ui/theme/[component-name].ts`
4. Export component props with TypeScript

**Example: Creating a Badge Component**

Create `app/components/ui/badge.vue`:

```vue
<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', {
  variants: {
    variant: {
      default: 'bg-indigo-100 text-indigo-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type BadgeVariants = VariantProps<typeof badgeVariants>

interface Props extends HTMLAttributes {
  variant?: BadgeVariants['variant']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
```

**Usage**:

```vue
<UiBadge variant="success">Active</UiBadge>
```

### 2. Form Components (`components/forms/`)

For form-specific components with validation.

**Steps**:

1. Create file: `app/components/forms/[form-name]-form.vue`
2. Use `vee-validate` + `yup` for validation
3. Follow the established pattern (see existing forms)
4. Include loading states, error handling, and success messages

**Example Pattern**:

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().min(2).required(),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [email] = defineField('email')
const [name] = defineField('name')

const state = ref({ loading: false, error: null, success: false })

const onSubmit = handleSubmit(async values => {
  state.value = { loading: true, error: null, success: false }
  try {
    await $fetch('/api/some-endpoint', {
      method: 'POST',
      body: values,
    })
    state.value.success = true
  } catch (error: any) {
    state.value.error = error.message || 'Something went wrong'
  } finally {
    state.value.loading = false
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <!-- Form fields here -->
  </form>
</template>
```

### 3. Page-Specific Components

For components used only on specific pages.

**Steps**:

1. Create directory: `app/components/[page-name]/`
2. Add component: `app/components/[page-name]/[component-name].vue`
3. Use in page as `<PageNameComponentName />`

**Example**:

```
app/components/dashboard/stats-card.vue → <DashboardStatsCard />
app/components/profile/avatar-upload.vue → <ProfileAvatarUpload />
```

---

## Adding Pages

Nuxt uses **file-based routing**. Pages are auto-registered based on filename.

### Basic Page

Create `app/pages/about.vue`:

```vue
<script setup lang="ts">
// Page metadata
definePageMeta({
  layout: 'default', // Optional: specify layout
  middleware: 'auth', // Optional: add middleware
})

// SEO
useSeoMeta({
  title: 'About',
  description: 'About our application',
})
</script>

<template>
  <div>
    <h1>About Page</h1>
  </div>
</template>
```

**Route**: `/about`

### Dynamic Route

Create `app/pages/users/[id].vue`:

```vue
<script setup lang="ts">
const route = useRoute()
const userId = route.params.id

const { data: user } = await useFetch(`/api/users/${userId}`)
</script>

<template>
  <div>
    <h1>User: {{ user?.name }}</h1>
  </div>
</template>
```

**Route**: `/users/123` (where `123` is the dynamic id)

### Nested Routes

Create a folder structure:

```
app/pages/
├── users/
│   ├── index.vue       # /users
│   ├── [id].vue        # /users/:id
│   └── create.vue      # /users/create
```

### Protected Pages

Add `auth` middleware:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // Requires authentication
})
</script>
```

---

## Adding API Endpoints

API routes are defined in `server/api/` using the following pattern:

### Naming Convention

`[route-name].[http-method].ts`

**Examples**:

- `users.get.ts` → `GET /api/users`
- `users.post.ts` → `POST /api/users`
- `user/[id].get.ts` → `GET /api/user/:id`
- `user/[id].patch.ts` → `PATCH /api/user/:id`
- `user/[id].delete.ts` → `DELETE /api/user/:id`

### Basic Endpoint

Create `server/api/posts.get.ts`:

```typescript
export default defineEventHandler(async event => {
  const db = useDatabase()

  const posts = await db.select().from(postsTable)

  return posts
})
```

### Endpoint with Parameters

Create `server/api/posts/[id].get.ts`:

```typescript
export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  const db = useDatabase()

  const post = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1)

  if (!post.length) {
    throw createError({
      statusCode: 404,
      message: 'Post not found',
    })
  }

  return post[0]
})
```

### Endpoint with Body

Create `server/api/posts.post.ts`:

```typescript
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
})

export default defineEventHandler(async event => {
  const body = await readBody(event)

  // Validate body
  const result = createPostSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request body',
      data: result.error.errors,
    })
  }

  const db = useDatabase()

  const [post] = await db.insert(postsTable).values(result.data).returning()

  return post
})
```

### Protected Endpoint

Create `server/api/user/posts.get.ts`:

```typescript
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async event => {
  // Require authentication
  const session = await requireAuth(event)

  const db = useDatabase()

  const posts = await db.select().from(postsTable).where(eq(postsTable.userId, session.user.id))

  return posts
})
```

### Query Parameters

```typescript
export default defineEventHandler(async event => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10

  // Use page and limit for pagination
})
```

---

## Working with the Database

This project uses **Drizzle ORM** with **Neon (PostgreSQL)**.

### Defining a Schema

Edit `server/database/schema.ts`:

```typescript
import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const postsTable = pgTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Define relations
export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postsTable.authorId],
    references: [userTable.id],
  }),
}))
```

### Running Migrations

After schema changes:

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate

# OR push directly (for development)
pnpm db:push
```

### Querying the Database

```typescript
import { useDatabase } from '~/server/database'
import { eq, and, desc, like } from 'drizzle-orm'
import { postsTable } from '~/server/database/schema'

export default defineEventHandler(async event => {
  const db = useDatabase()

  // SELECT
  const posts = await db.select().from(postsTable)

  // WHERE
  const post = await db.select().from(postsTable).where(eq(postsTable.id, 'some-id'))

  // Multiple conditions
  const filteredPosts = await db
    .select()
    .from(postsTable)
    .where(and(eq(postsTable.published, true), like(postsTable.title, '%nuxt%')))
    .orderBy(desc(postsTable.createdAt))

  // INSERT
  const [newPost] = await db
    .insert(postsTable)
    .values({
      title: 'New Post',
      content: 'Content here',
      authorId: 'user-id',
    })
    .returning()

  // UPDATE
  const [updated] = await db.update(postsTable).set({ published: true }).where(eq(postsTable.id, 'post-id')).returning()

  // DELETE
  await db.delete(postsTable).where(eq(postsTable.id, 'post-id'))

  return posts
})
```

### Joins and Relations

```typescript
const postsWithAuthors = await db.query.postsTable.findMany({
  with: {
    author: true,
  },
  where: eq(postsTable.published, true),
})
```

---

## Adding Forms

Forms use **vee-validate** + **yup** for validation.

### Form Structure

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

// Define validation schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
})

// Initialize form
const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
})

// Define fields
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// Component state
const state = ref({
  loading: false,
  error: null as string | null,
  success: false,
})

// Submit handler
const onSubmit = handleSubmit(async values => {
  state.value = { loading: true, error: null, success: false }

  try {
    const result = await $fetch('/api/endpoint', {
      method: 'POST',
      body: values,
    })

    state.value.success = true
    resetForm() // Optional: reset form after success
  } catch (err: any) {
    state.value.error = err.data?.message || 'Something went wrong'
  } finally {
    state.value.loading = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <!-- Success message -->
    <div v-if="state.success" class="rounded-md bg-green-50 p-4">
      <p class="text-sm text-green-800">Success!</p>
    </div>

    <!-- Error message -->
    <div v-if="state.error" class="rounded-md bg-red-50 p-4">
      <p class="text-sm text-red-800">{{ state.error }}</p>
    </div>

    <!-- Email field -->
    <div>
      <label for="email" class="block text-sm font-medium">Email</label>
      <input
        id="email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">
        {{ errors.email }}
      </p>
    </div>

    <!-- Password field -->
    <div>
      <label for="password" class="block text-sm font-medium">Password</label>
      <input
        id="password"
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">
        {{ errors.password }}
      </p>
    </div>

    <!-- Submit button -->
    <UiButton type="submit" :disabled="state.loading" class="w-full">
      {{ state.loading ? 'Submitting...' : 'Submit' }}
    </UiButton>
  </form>
</template>
```

### Validation Patterns

```typescript
// Common validation rules
const schema = yup.object({
  // Required string
  name: yup.string().required('Name is required'),

  // Email
  email: yup.string().email('Invalid email').required('Email is required'),

  // Min/Max length
  username: yup.string().min(3).max(20).required(),

  // Password
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .required(),

  // Confirm password
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),

  // URL
  website: yup.string().url('Must be a valid URL'),

  // Number
  age: yup.number().min(18).max(120).required(),

  // Boolean
  terms: yup.boolean().oneOf([true], 'You must accept terms'),

  // Optional field
  bio: yup.string().max(500).optional(),
})
```

---

## Styling Guidelines

### Tailwind CSS

This project uses **Tailwind CSS 4** with utility-first approach.

**Core Principles**:

- Use Tailwind utilities directly in templates
- No custom CSS unless absolutely necessary
- Use `cn()` helper for conditional classes

### Color Palette

```typescript
// Primary colors
'bg-indigo-600 hover:bg-indigo-500' // Primary actions
'text-indigo-600' // Primary text/links

// Neutral colors
'bg-gray-50' // Light backgrounds
'bg-gray-100' // Card backgrounds
'text-gray-900' // Primary text
'text-gray-600' // Secondary text
'border-gray-300' // Borders

// Semantic colors
'bg-red-600 hover:bg-red-500' // Destructive actions
'bg-green-600' // Success states
'bg-yellow-600' // Warning states
```

### Common Patterns

```vue
<!-- Container -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Card -->
<div class="rounded-lg bg-white p-6 shadow">
  <!-- Card content -->
</div>

<!-- Button -->
<button class="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
  Click me
</button>

<!-- Input -->
<input
  type="text"
  class="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
/>

<!-- Grid -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <!-- Grid items -->
</div>

<!-- Flex -->
<div class="flex items-center justify-between">
  <!-- Flex items -->
</div>
```

### Responsive Design

```vue
<!-- Mobile first approach -->
<div class="text-sm sm:text-base lg:text-lg">
  Responsive text
</div>

<!-- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px) -->
```

### Using `cn()` Helper

```vue
<script setup lang="ts">
import { cn } from '~/lib/utils'

const variant = ref<'primary' | 'secondary'>('primary')

const buttonClasses = computed(() =>
  cn(
    'rounded-md px-4 py-2',
    variant.value === 'primary' && 'bg-indigo-600 text-white',
    variant.value === 'secondary' && 'bg-gray-200 text-gray-900'
  )
)
</script>

<template>
  <button :class="buttonClasses">Button</button>
</template>
```

---

## Authentication Patterns

### Checking Authentication Status

```vue
<script setup lang="ts">
const { user, isAuthenticated } = useAuth()
</script>

<template>
  <div v-if="isAuthenticated">Welcome, {{ user?.name }}!</div>
  <div v-else>Please sign in</div>
</template>
```

### Protecting Routes

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>
```

### Getting User in API Routes

```typescript
import { requireAuth, getServerSession } from '~/server/utils/auth'

export default defineEventHandler(async event => {
  // Option 1: Require auth (throws 401 if not authenticated)
  const session = await requireAuth(event)
  const userId = session.user.id

  // Option 2: Optional auth
  const sessionOrNull = await getServerSession(event)
  if (!sessionOrNull) {
    // User not authenticated
  }
})
```

### Sign In/Out

```vue
<script setup lang="ts">
const { login, logout } = useAuth()

const handleLogin = async () => {
  const result = await login('user@example.com', 'password')
  if (result.success) {
    navigateTo('/dashboard')
  }
}

const handleLogout = async () => {
  await logout()
  navigateTo('/sign-in')
}
</script>
```

---

## Common Patterns

### Loading States

```vue
<script setup lang="ts">
const loading = ref(false)
const data = ref(null)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    data.value = await $fetch('/api/data')
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="data">{{ data }}</div>
  </div>
</template>
```

### Using `useFetch`

```vue
<script setup lang="ts">
// Automatic loading, error, and data handling
const { data, pending, error, refresh } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="post in data" :key="post.id">
        {{ post.title }}
      </div>
    </div>
  </div>
</template>
```

### Composables

```typescript
// app/composables/usePosts.ts
export function usePosts() {
  const posts = ref([])
  const loading = ref(false)

  const fetchPosts = async () => {
    loading.value = true
    try {
      posts.value = await $fetch('/api/posts')
    } finally {
      loading.value = false
    }
  }

  const createPost = async (data: any) => {
    const post = await $fetch('/api/posts', {
      method: 'POST',
      body: data,
    })
    posts.value.push(post)
    return post
  }

  return {
    posts: readonly(posts),
    loading: readonly(loading),
    fetchPosts,
    createPost,
  }
}
```

---

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Props over State**: Prefer props for data flow when possible
3. **Emit Events**: Use emits for child-to-parent communication
4. **Composables for Logic**: Extract reusable logic into composables
5. **TypeScript**: Always type props, emits, and composables

### Performance

1. **Lazy Load Components**: Use `defineAsyncComponent` for large components
2. **Use `useFetch` for SSR**: Better SEO and initial load time
3. **Debounce Search**: Use `useDebounceFn` for search inputs
4. **Pagination**: Don't load all data at once
5. **Image Optimization**: Use `<NuxtImg>` component

### Security

1. **Validate All Inputs**: Use Zod/Yup for API endpoint validation
2. **Sanitize User Data**: Never trust user input
3. **Use HTTPS**: Always in production
4. **CSRF Protection**: Better Auth handles this
5. **SQL Injection**: Drizzle ORM prevents this by default
6. **Rate Limiting**: Consider adding for production

### Code Quality

1. **Consistent Naming**: Follow the conventions in this guide
2. **Component Structure**: Script → Template → Style (if needed)
3. **No Inline Styles**: Use Tailwind utilities
4. **Error Handling**: Always handle errors gracefully
5. **Loading States**: Show feedback for async operations
6. **Accessibility**: Use semantic HTML and ARIA attributes

### Database

1. **Indexes**: Add indexes for frequently queried columns
2. **Migrations**: Always use migrations, never modify schema directly in production
3. **Transactions**: Use for multiple related operations
4. **Soft Deletes**: Consider adding `deletedAt` instead of hard deletes
5. **Timestamps**: Always include `createdAt` and `updatedAt`

### Git Workflow

1. **Descriptive Commits**: Use clear, descriptive commit messages
2. **Feature Branches**: Create branches for new features
3. **Pull Requests**: Review code before merging
4. **Environment Files**: Never commit `.env` files
5. **Lock Files**: Commit `pnpm-lock.yaml`

---

## Quick Reference

### Import Paths

```typescript
// Components (auto-imported, no import needed)
<UiButton />

// Composables (auto-imported)
const { user } = useAuth()

// Utils
import { cn } from '~/lib/utils'

// API calls
const data = await $fetch('/api/endpoint')

// Navigation
await navigateTo('/dashboard')

// Database
import { useDatabase } from '~/server/database'
import { postsTable } from '~/server/database/schema'
import { eq, and, or, desc } from 'drizzle-orm'
```

### Useful Commands

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
pnpm format           # Format code with Prettier
pnpm lint             # Lint code with ESLint
```

---

This guide should cover most common scenarios. For more specific use cases, refer to the official documentation:

- [Nuxt 4 Docs](https://nuxt.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://www.better-auth.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Reka UI](https://reka-ui.com/)

---

Do not add comments, be clear with namings. Be extremely concise, reduce grammar for the sake of concision.
