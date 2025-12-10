export function useProtectedPage() {
  const { user, isAuthenticated } = useAuth()

  onBeforeMount(() => {
    if (!isAuthenticated.value) {
      navigateTo('/')
    }
  })

  return { user }
}
