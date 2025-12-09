import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image'],
  css: ['./app/assets/css/index.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  },
  alias: {
    '~': fileURLToPath(new URL('./app', import.meta.url)),
    '~~': fileURLToPath(new URL('./server', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
})
