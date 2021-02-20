import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { GqlExecutionContext } from "@nestjs/graphql"
import { verify } from "jsonwebtoken"
import { JWT, JwtConfig } from "src/config/jwt.config"
import { GqlContextType } from "src/gql/gql.context"
import { JwtPayload } from "src/jwt/types/jwt.payload"
import { UserService } from "src/user/user.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const gqlContext = ctx.getContext<GqlContextType>()

    const accessToken = gqlContext.req.headers.authorization?.split(" ")[1]

    if (!accessToken) return false

    try {
      const payload = verify(
        accessToken,
        this.configService.get<JwtConfig>(JWT).accessTokenSecret,
      ) as JwtPayload

      if (!payload?.userId) {
        return false
      }

      const user = await this.userService.findById(payload.userId)

      if (!user) return false
      gqlContext.user = user

      return true
    } catch (e) {
      return false
    }
  }
}
