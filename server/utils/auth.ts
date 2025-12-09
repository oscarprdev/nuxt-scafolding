import type { H3Event } from 'h3'
import { auth } from '../database/auth'

export async function getServerSession(event: H3Event) {
  const session = await auth.api.getSession({
    headers: event.headers,
  })
  return session
}

export async function requireAuth(event: H3Event) {
  const session = await getServerSession(event)

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to access this resource',
    })
  }

  return session
}
