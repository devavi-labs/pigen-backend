import { Field, ObjectType } from "@nestjs/graphql"
import { FieldError } from "src/fieldError/entities/fieldError.entity"
import { User } from "../entities/user.entity"

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User | null

  @Field({ nullable: true })
  accessToken?: string

  @Field({ nullable: true })
  refreshToken?: string

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[] | null
}
