import { User } from "src/user/entities/user.entity"

export type GqlContextType = {
  user?: User
}

export class GqlContext implements GqlContextType {
  user?: User
}
