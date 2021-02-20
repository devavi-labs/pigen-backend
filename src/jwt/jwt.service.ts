import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { User } from "src/user/entities/user.entity"
import { JwtPayload } from "./types/jwt.payload"
import { sign } from "jsonwebtoken"
import { JWT, JwtConfig } from "src/config/jwt.config"

@Injectable()
export class JwtService {
  private user: User
  constructor(private readonly configService: ConfigService) {}

  setUser(user: User) {
    this.user = user
  }

  getPayload(): JwtPayload {
    return {
      userId: this.user._id,
    }
  }

  createAccessToken(): string {
    return sign(
      this.getPayload(),
      this.configService.get<JwtConfig>(JWT).accessTokenSecret,
      {
        expiresIn: "2h",
      },
    )
  }

  createRefreshToken(): string {
    return sign(
      this.getPayload(),
      this.configService.get<JwtConfig>(JWT).refreshTokenSecret,
      {
        expiresIn: "1y",
      },
    )
  }
}
