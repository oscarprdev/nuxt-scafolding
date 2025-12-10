import { authClient } from '~/lib/auth-client'

const PROTECTED_ROUTES = ['/dashboard']

const PUBLIC_ROUTES = ['/', '/sign-in', '/sign-up']

export default defineNuxtRouteMiddleware(async to => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    if (PROTECTED_ROUTES.includes(to.path)) {
      return navigateTo(PUBLIC_ROUTES[0])
    }
    if (PUBLIC_ROUTES.includes(to.path)) {
      return navigateTo(PROTECTED_ROUTES[0])
    }
  }
})
