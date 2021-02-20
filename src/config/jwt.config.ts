import { registerAs } from "@nestjs/config"

export interface JwtConfig {
  accessTokenSecret: string
  refreshTokenSecret: string
}

export const JWT = "JWT"

export default registerAs<() => JwtConfig>(JWT, () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
}))
