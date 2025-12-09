import { requireAuth } from '~~/utils/auth'
import { useDatabase } from '~~/database'
import { user as userTable } from '~~/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async event => {
  const session = await requireAuth(event)
  const body = await readBody(event)

  const { name, image } = body

  if (!name && !image) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'At least one field (name or image) must be provided',
    })
  }

  const db = useDatabase()

  const updateData: any = {
    updatedAt: new Date(),
  }

  if (name) updateData.name = name
  if (image) updateData.image = image

  const [updatedUser] = await db.update(userTable).set(updateData).where(eq(userTable.id, session.user.id)).returning()

  return {
    success: true,
    user: updatedUser,
  }
})
