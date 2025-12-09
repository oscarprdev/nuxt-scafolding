# Authentication & User Management Guide

This project uses **Better Auth** for authentication and user management. This guide covers all aspects of working with authentication in this application.

## Table of Contents

- [Overview](#overview)
- [Authentication Flow](#authentication-flow)
- [User Management](#user-management)
- [Protected Routes](#protected-routes)
- [API Endpoints](#api-endpoints)
- [Composables](#composables)
- [Middleware](#middleware)
- [Database Schema](#database-schema)

## Overview

Better Auth provides a complete authentication solution with:
- Email/Password authentication
- Session management
- Database-backed user storage
- Type-safe APIs
- Secure password hashing

## Authentication Flow

### Sign Up

1. User fills out the registration form (`/sign-up`)
2. Form data is sent to Better Auth API
3. Password is hashed and user is created in the database
4. Session is created and stored
5. User is redirected to dashboard

### Sign In

1. User enters credentials (`/sign-in`)
2. Credentials are validated against database
3. Session is created on success
4. User is redirected to dashboard

### Sign Out

1. User clicks sign out button
2. Session is invalidated
3. User is redirected to sign-in page

## User Management

### Using the `useAuth()` Composable

The `useAuth()` composable provides easy access to authentication state and methods:

```vue
<script setup>
const { user, isAuthenticated, login, register, logout } = useAuth()

// Access current user
console.log(user.value) // { id, name, email, emailVerified, ... }

// Check authentication status
if (isAuthenticated.value) {
  // User is logged in
}

// Sign in
const result = await login(email, password)
if (result.success) {
  // Login successful
} else {
  console.error(result.error)
}

// Register new user
const result = await register(name, email, password)

// Sign out
await logout()
</script>
```

### User Properties

The user object contains:
- `id` - Unique user identifier
- `name` - User's full name
- `email` - User's email address
- `emailVerified` - Boolean indicating if email is verified
- `image` - Optional profile image URL
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Updating User Profile

Use the profile update API endpoint:

```typescript
const response = await $fetch('/api/user/update', {
  method: 'PATCH',
  body: {
    name: 'New Name',
    image: 'https://example.com/avatar.jpg'
  }
})
```

Or use the `UserProfileForm` component:

```vue
<template>
  <UserProfileForm :user="user" @updated="handleUpdate" />
</template>

<script setup>
const { user } = useAuth()

const handleUpdate = () => {
  // Refresh user data or show notification
}
</script>
```

## Protected Routes

### Using Middleware

Add middleware to any page that requires authentication:

```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

The auth middleware automatically:
- Redirects unauthenticated users to `/sign-in`
- Redirects authenticated users away from `/sign-in` and `/sign-up`

### Manual Protection

You can also manually check authentication status:

```vue
<script setup>
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/sign-in')
  }
})
</script>
```

## API Endpoints

### Authentication Endpoints

**Base:** `/api/auth/*`

All Better Auth endpoints are handled by the catch-all route at `server/api/auth/[...all].ts`

### User Management Endpoints

#### Get Current User Profile

```http
GET /api/user/profile
Authorization: Required (session cookie)
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": true,
    "image": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile

```http
PATCH /api/user/update
Authorization: Required (session cookie)
Content-Type: application/json
```

Request Body:
```json
{
  "name": "New Name",
  "image": "https://example.com/avatar.jpg"
}
```

Response:
```json
{
  "success": true,
  "user": { /* updated user object */ }
}
```

#### Get All Users (Example)

```http
GET /api/users
```

Response:
```json
{
  "success": true,
  "data": [ /* array of users */ ]
}
```

## Composables

### `useAuth()`

Main authentication composable.

**Properties:**
- `user` - Computed ref to current user (null if not authenticated)
- `session` - Current session data
- `isAuthenticated` - Computed boolean for auth status

**Methods:**
- `login(email, password)` - Sign in user
- `register(name, email, password)` - Create new account
- `logout()` - Sign out user

**Returns:**
All methods return `{ success: boolean, error: string | null }`

## Middleware

### Auth Middleware (`app/middleware/auth.ts`)

Automatically protects routes and manages redirects.

**Behavior:**
- Protected routes (e.g., `/dashboard`) → Redirects to `/sign-in` if not authenticated
- Auth pages (`/sign-in`, `/sign-up`) → Redirects to `/dashboard` if authenticated
- Client-side only (skipped during SSR)

### Server Utilities

#### `getServerSession(event)`

Get the current session from an H3 event:

```typescript
import { getServerSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  if (session) {
    // User is authenticated
  }
})
```

#### `requireAuth(event)`

Require authentication or throw 401 error:

```typescript
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  // session is guaranteed to exist here
})
```

## Database Schema

### User Table

```typescript
{
  id: string (primary key)
  name: string
  email: string (unique)
  emailVerified: boolean
  image: string | null
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Session Table

```typescript
{
  id: string (primary key)
  expiresAt: timestamp
  token: string (unique)
  createdAt: timestamp
  updatedAt: timestamp
  ipAddress: string | null
  userAgent: string | null
  userId: string (foreign key → user.id)
}
```

### Account Table

For OAuth and password storage:

```typescript
{
  id: string (primary key)
  accountId: string
  providerId: string
  userId: string (foreign key → user.id)
  accessToken: string | null
  refreshToken: string | null
  idToken: string | null
  accessTokenExpiresAt: timestamp | null
  refreshTokenExpiresAt: timestamp | null
  scope: string | null
  password: string | null (hashed)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Verification Table

For email verification:

```typescript
{
  id: string (primary key)
  identifier: string
  value: string
  expiresAt: timestamp
  createdAt: timestamp | null
  updatedAt: timestamp | null
}
```

## Best Practices

1. **Always use composables** - Use `useAuth()` instead of directly calling Better Auth APIs
2. **Protect sensitive routes** - Add `middleware: 'auth'` to protected pages
3. **Handle errors gracefully** - Always check the `success` property in API responses
4. **Server-side validation** - Use `requireAuth()` in server endpoints that need authentication
5. **Secure secrets** - Keep `BETTER_AUTH_SECRET` secure and never commit it
6. **HTTPS in production** - Always use HTTPS in production environments

## Examples

### Complete Sign In Page

See `app/pages/sign-in.vue` for a complete example.

### Protected Dashboard

See `app/pages/dashboard.vue` for a protected route example.

### Profile Update Component

See `app/components/UserProfileForm.vue` for a profile update form.

## Troubleshooting

### Session not persisting
- Ensure cookies are enabled
- Check that `BETTER_AUTH_URL` matches your application URL
- Verify `BETTER_AUTH_SECRET` is set

### 401 Unauthorized errors
- Session may have expired
- User may need to sign in again
- Check that auth middleware is properly configured

### Database connection issues
- Verify `DATABASE_URL` is correct
- Ensure database migrations are up to date: `pnpm db:push`
- Check database schema matches Better Auth requirements
