<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="text-center space-y-8">
      <h1 class="text-6xl font-bold text-gray-900">project</h1>
      <div v-if="user">
        <p class="text-2xl text-gray-600 mb-8">Welcome, {{ user.name }}!</p>
        <UiButton @click="handleLogout" variant="outline"> Log out </UiButton>
      </div>
    </div>
  </div>
</template>
