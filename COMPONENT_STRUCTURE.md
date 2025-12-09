# Component Organization Guide

This document explains the component structure and naming conventions used in this project.

## Component Structure

Components are organized into logical directories based on their purpose:

```
app/components/
├── forms/          # Form components
├── ui/             # Shared UI components
├── dashboard/      # Dashboard-specific components
├── [page-name]/    # Page-specific components
└── ...
```

## Naming Conventions

### File Names
All component files use **dash-case** (kebab-case) naming:

✅ **Good:**
- `user-profile-form.vue`
- `example-dialog.vue`
- `auth-button.vue`

❌ **Bad:**
- `UserProfileForm.vue`
- `ExampleDialog.vue`
- `authButton.vue`

### Component Usage in Templates

Nuxt auto-imports components based on their directory structure. The component name in templates follows this pattern:

```
Directory/file-name.vue → <DirectoryFileName />
```

**Examples:**

| File Path | Template Usage |
|-----------|---------------|
| `components/ui/example-dialog.vue` | `<UiExampleDialog />` |
| `components/forms/user-profile-form.vue` | `<FormsUserProfileForm />` |
| `components/dashboard/stats-card.vue` | `<DashboardStatsCard />` |

## Directory Guidelines

### `components/forms/`
**Purpose:** All form components

**Examples:**
- `user-profile-form.vue` - User profile editing form
- `sign-in-form.vue` - Sign-in form
- `contact-form.vue` - Contact form

**When to use:**
- Component's primary purpose is form handling
- Contains form inputs and validation
- Uses vee-validate or similar form library

**Usage:**
```vue
<template>
  <FormsUserProfileForm :user="user" @updated="handleUpdate" />
</template>
```

### `components/ui/`
**Purpose:** Shared, reusable UI components

**Examples:**
- `example-dialog.vue` - Dialog/modal component
- `button.vue` - Custom button component
- `card.vue` - Card wrapper component
- `loading-spinner.vue` - Loading indicator
- `toast.vue` - Toast notification

**When to use:**
- Component is used across multiple pages
- Component is a generic UI element
- Component provides common functionality

**Usage:**
```vue
<template>
  <UiExampleDialog>
    <p>Dialog content</p>
  </UiExampleDialog>
</template>
```

### `components/[page-name]/`
**Purpose:** Page-specific components

**Examples:**
- `components/dashboard/stats-card.vue`
- `components/dashboard/recent-activity.vue`
- `components/profile/avatar-upload.vue`
- `components/settings/notification-preferences.vue`

**When to use:**
- Component is only used on a specific page
- Component contains page-specific logic
- Component doesn't need to be shared

**Usage:**
```vue
<!-- In dashboard.vue -->
<template>
  <div>
    <DashboardStatsCard :stats="userStats" />
    <DashboardRecentActivity :activities="recent" />
  </div>
</template>
```

## Component Best Practices

### 1. Script-First Structure

Always place `<script setup>` at the top:

```vue
<script setup lang="ts">
// Props, emits, composables, logic
defineProps<{ user: User }>()
const { data } = useAuth()
</script>

<template>
  <!-- Template content -->
</template>
```

### 2. Single State Ref

Use a single ref for component state:

```vue
<script setup lang="ts">
const componentState = ref({
  loading: false,
  error: '',
  success: '',
})
</script>
```

### 3. Form Validation

Use vee-validate with yup for forms:

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
</script>
```

### 4. Props and Emits

Always define prop types and emits:

```vue
<script setup lang="ts">
const props = defineProps<{
  user: User
  isLoading?: boolean
}>()

const emit = defineEmits<{
  updated: [user: User]
  deleted: []
}>()
</script>
```

## Migration Guide

### Moving Components

When creating or moving a component:

1. **Determine the component type:**
   - Form? → `components/forms/`
   - Shared UI? → `components/ui/`
   - Page-specific? → `components/[page-name]/`

2. **Use dash-case naming:**
   ```bash
   # Create new component
   touch app/components/ui/my-component.vue

   # Move existing component
   mv app/components/MyComponent.vue app/components/ui/my-component.vue
   ```

3. **Update imports in files:**
   ```vue
   <!-- Before -->
   <MyComponent />

   <!-- After -->
   <UiMyComponent />
   ```

### Auto-Import Examples

Nuxt automatically imports components. No explicit import needed:

```vue
<script setup lang="ts">
// No imports needed! Nuxt auto-imports based on file structure
</script>

<template>
  <div>
    <!-- Auto-imported from components/ui/example-dialog.vue -->
    <UiExampleDialog />

    <!-- Auto-imported from components/forms/user-profile-form.vue -->
    <FormsUserProfileForm :user="user" />

    <!-- Auto-imported from components/dashboard/stats-card.vue -->
    <DashboardStatsCard :stats="stats" />
  </div>
</template>
```

## Quick Reference

| Component Type | Directory | Example File | Template Usage |
|---------------|-----------|--------------|----------------|
| Form | `components/forms/` | `sign-in-form.vue` | `<FormsSignInForm />` |
| Shared UI | `components/ui/` | `modal.vue` | `<UiModal />` |
| Dashboard | `components/dashboard/` | `chart.vue` | `<DashboardChart />` |
| Profile | `components/profile/` | `avatar.vue` | `<ProfileAvatar />` |
| Settings | `components/settings/` | `section.vue` | `<SettingsSection />` |

## Tips

1. **Keep components focused:** Each component should do one thing well
2. **Use composition:** Break large components into smaller, reusable pieces
3. **Follow the structure:** Consistency makes the codebase easier to navigate
4. **Document complex components:** Add JSDoc comments for props and emits
5. **Test your components:** Write tests for critical component logic
