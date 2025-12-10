<script setup lang="ts">
const { user } = useAuth()
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-8">project</h1>
      <div class="flex gap-4 justify-center">
        <template v-if="!user">
          <NuxtLink to="/sign-in">
            <Button variant="primary">Sign In</Button>
          </NuxtLink>
          <NuxtLink to="/sign-up">
            <Button variant="outline">Sign Up</Button>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/dashboard">
            <Button variant="primary">Go to Dashboard</Button>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
