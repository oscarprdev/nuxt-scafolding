import { useSession } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async to => {
  // Skip middleware during server-side rendering
  if (import.meta.server) return

  const session = useSession()

  // If trying to access protected route without session
  if (!session.value.data && to.path.startsWith('/dashboard')) {
    return navigateTo('/sign-in')
  }

  // If already logged in and trying to access auth pages
  if (session.value.data && (to.path === '/sign-in' || to.path === '/sign-up')) {
    return navigateTo('/dashboard')
  }
})
