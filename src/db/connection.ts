import postgres from 'postgres'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env'

const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection, { schema })
