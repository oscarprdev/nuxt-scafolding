import { useSession, signIn, signUp, signOut } from '~/lib/auth-client'

export function useAuth() {
  const session = useSession()

  const user = computed(() => session.value?.data?.user ?? null)
  const isAuthenticated = computed(() => !!session.value?.data)

  const login = async (email: string, password: string) => {
    try {
      await signIn.email({ email, password })
      return { success: true, error: null }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to sign in',
      }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      await signUp.email({ name, email, password })
      return { success: true, error: null }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create account',
      }
    }
  }

  const logout = async () => {
    try {
      await signOut()
      await navigateTo('/sign-in')
      return { success: true, error: null }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to sign out',
      }
    }
  }

  return {
    user,
    session: session.value?.data,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
