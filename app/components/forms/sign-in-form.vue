<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

const state = ref({
  loading: false,
  error: null as string | null,
})

const { login } = useAuth()
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async values => {
  state.value = { loading: true, error: null }

  try {
    const result = await login(values.email, values.password)

    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      state.value.error = result.error || 'Invalid credentials'
    }
  } catch (err: any) {
    state.value.error = err.message || 'Something went wrong'
  } finally {
    state.value.loading = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <Alert v-if="state.error" variant="error">
      {{ state.error }}
    </Alert>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <Input id="email" v-model="email" v-bind="emailAttrs" type="email" placeholder="you@example.com" />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <Input id="password" v-model="password" v-bind="passwordAttrs" type="password" placeholder="••••••••" />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
    </div>

    <Button type="submit" variant="primary" :disabled="state.loading" class="w-full">
      {{ state.loading ? 'Signing in...' : 'Sign in' }}
    </Button>

    <p class="text-center text-sm text-gray-600">
      Don't have an account?
      <NuxtLink to="/sign-up" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </NuxtLink>
    </p>
  </form>
</template>
