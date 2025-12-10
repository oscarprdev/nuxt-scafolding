<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(8, 'Min 8 characters'),
})

const state = ref({
  loading: false,
  error: null as string | null,
  success: false,
})

const { register } = useAuth()
const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async values => {
  state.value = { loading: true, error: null, success: false }

  try {
    const result = await register(values.name, values.email, values.password)

    if (result.success) {
      state.value.success = true
      resetForm()
      setTimeout(() => navigateTo('/dashboard'), 1500)
    } else {
      state.value.error = result.error || 'Failed to create account'
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
    <UiAlert v-if="state.error" variant="error">
      {{ state.error }}
    </UiAlert>

    <UiAlert v-if="state.success" variant="success"> Account created! Redirecting... </UiAlert>

    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <UiInput id="name" v-model="name" v-bind="nameAttrs" type="text" placeholder="John Doe" />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <UiInput id="email" v-model="email" v-bind="emailAttrs" type="email" placeholder="you@example.com" />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <UiInput id="password" v-model="password" v-bind="passwordAttrs" type="password" placeholder="••••••••" />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
    </div>

    <UiButton type="submit" variant="primary" :disabled="state.loading" class="w-full">
      {{ state.loading ? 'Creating account...' : 'Sign up' }}
    </UiButton>

    <p class="text-center text-sm text-gray-600">
      Already have an account?
      <NuxtLink to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign in </NuxtLink>
    </p>
  </form>
</template>
