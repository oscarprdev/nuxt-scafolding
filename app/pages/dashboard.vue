<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user } = useAuth()
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4" v-if="user">
    <div class="text-center space-y-8">
      <h1 class="text-6xl font-bold text-gray-900">project</h1>
      <p class="text-2xl text-gray-600 mb-8">Welcome, {{ user.name }}!</p>
    </div>
  </div>
</template>
