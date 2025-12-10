<script setup lang="ts">
useSeoMeta({
  title: 'Sign In',
  description: 'Sign in to your project account',
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 bg-gray-50">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">project</h1>
        <h2 class="text-2xl font-semibold text-gray-900">Sign in</h2>
        <p class="mt-2 text-sm text-gray-600">Welcome back! Please sign in to continue.</p>
      </div>

      <div class="bg-white py-8 px-6 shadow rounded-lg">
        <FormsSignInForm />
      </div>
    </div>
  </div>
</template>
