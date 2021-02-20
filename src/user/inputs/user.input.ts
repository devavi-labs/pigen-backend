import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class UserInput {
  @Field()
  name: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  publicKey: string
}
