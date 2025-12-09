<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({
  middleware: 'auth',
})

const { login } = useAuth()

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

const formState = ref({
  loading: false,
  error: '',
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async values => {
  formState.value.loading = true
  formState.value.error = ''

  const result = await login(values.email, values.password)

  if (result.success) {
    navigateTo('/dashboard')
  } else {
    formState.value.error = result.error || 'Invalid credentials'
  }

  formState.value.loading = false
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">gym-tracker</h1>
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">Sign in</h2>
      </div>

      <form @submit="onSubmit" class="mt-8 space-y-4">
        <div v-if="formState.error" class="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {{ formState.error }}
        </div>

        <div>
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="Email"
            class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            :class="{ 'ring-red-500': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="Password"
            class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            :class="{ 'ring-red-500': errors.password }"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <UiButton type="submit" variant="primary" :disabled="formState.loading" class="w-full">
          {{ formState.loading ? 'Signing in...' : 'Sign in' }}
        </UiButton>

        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <NuxtLink to="/sign-up" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
