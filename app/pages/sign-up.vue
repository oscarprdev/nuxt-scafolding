<script setup lang="ts">
useSeoMeta({
  title: 'Sign Up',
  description: 'Create your project account',
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 bg-gray-50">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-900">Create account</h2>
        <p class="mt-2 text-sm text-gray-600">Join project and start tracking your progress.</p>
      </div>

      <div class="bg-white py-8 px-6 shadow rounded-lg">
        <FormsSignUpForm />
      </div>
    </div>
  </div>
</template>
