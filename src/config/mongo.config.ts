import { registerAs } from "@nestjs/config"

export interface MongoConfig {
  url: string
}

export const MONGO = "MONGO"

export default registerAs<() => MongoConfig>(MONGO, () => ({
  url: process.env.MONGO_DB_URL,
}))
