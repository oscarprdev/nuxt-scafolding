import { requireAuth } from '~~/utils/auth'

export default defineEventHandler(async event => {
  const session = await requireAuth(event)

  return {
    success: true,
    user: session.user,
  }
})
