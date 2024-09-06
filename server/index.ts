import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/server/schema'

// (process.env.POSTGRES_URL!) == (process.env.POSTGRES_URL as string)
const sql = neon(process.env.POSTGRES_URL!)
export const db = drizzle(sql, {schema, logger: true});



