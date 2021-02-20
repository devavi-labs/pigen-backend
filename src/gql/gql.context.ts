import { User } from "src/user/entities/user.entity"
import { Request, Response } from "express"
export type GqlContextType = {
  req: Request
  res: Response
  user?: User
}

export class GqlContext implements GqlContextType {
  req: Request
  res: Response
  user?: User

  constructor({ req, res, user }: GqlContextType) {
    this.req = req
    this.res = res
    this.user = user
  }
}
