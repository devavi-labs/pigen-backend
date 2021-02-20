import { Controller, Post, Request } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Express from "express"
import { verify } from "jsonwebtoken"
import { JWT, JwtConfig } from "src/config/jwt.config"
import { JwtService } from "src/jwt/jwt.service"
import { JwtPayload } from "src/jwt/types/jwt.payload"
import { UserService } from "src/user/user.service"
import { UserResponse } from "./responses/user.response"

@Controller("/auth")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("/refresh_token")
  async getRefreshToken(
    @Request() req: Express.Request,
  ): Promise<UserResponse> {
    const refreshToken = req.headers.authorization?.split(" ")[1]

    if (!refreshToken || refreshToken === "undefined") {
      return {
        errors: [
          {
            field: "refreshToken",
            message: "No refresh token found",
          },
        ],
      }
    }

    try {
      const payload = verify(
        refreshToken,
        this.configService.get<JwtConfig>(JWT).refreshTokenSecret,
      ) as JwtPayload

      if (!payload?.userId) {
        return {
          errors: [
            {
              field: "refreshToken",
              message: "Refresh token couldn't be verified",
            },
          ],
        }
      }

      const user = await this.userService.findById(payload.userId)

      if (!user) {
        return {
          errors: [
            {
              field: "user",
              message: "No user found",
            },
          ],
        }
      }

      this.jwtService.setUser(user)

      const accessToken = this.jwtService.createAccessToken()
      const newRefreshToken = this.jwtService.createRefreshToken()

      return {
        accessToken,
        refreshToken: newRefreshToken,
      }
    } catch ({ message }) {
      return {
        errors: [
          {
            field: "unknown",
            message,
          },
        ],
      }
    }
  }
}
