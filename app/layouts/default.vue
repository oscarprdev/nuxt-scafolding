<script setup lang="ts">
const { user, logout } = useAuth()

const handleSignOut = async () => {
  await logout()
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">project</NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <template v-if="user">
              <div class="flex items-center gap-3">
                <UiButton @click="handleSignOut" variant="outline"> Log out </UiButton>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/sign-in">
                <UiButton variant="primary">Sign In</UiButton>
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
