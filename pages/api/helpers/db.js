import { MongoClient } from "mongodb"

const { NEXT_PUBLIC_DATABASE_URL } = process.env

if (!NEXT_PUBLIC_DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  )
}
/*
if (!MONGO_DB) {
  throw new Error(
    "Please define the MONGO_DB environment variable inside .env.local"
  )
}
*/

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(NEXT_PUBLIC_DATABASE_URL, opts).then(client => {
      return {
        client,
        db: client.db(),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}