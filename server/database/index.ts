import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool } from '@neondatabase/serverless'
import * as schema from './schema'

let db: ReturnType<typeof drizzle>

export function useDatabase() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    const pool = new Pool({ connectionString })
    db = drizzle(pool, { schema })
  }
  return db
}
