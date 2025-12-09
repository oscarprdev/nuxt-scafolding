import { useDatabase } from '../database'
import { user } from '../database/schema'

export default defineEventHandler(async () => {
  try {
    const db = useDatabase()
    const allUsers = await db.select().from(user)
    return {
      success: true,
      data: allUsers,
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      success: false,
      error: 'Failed to fetch users',
    }
  }
})
