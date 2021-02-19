import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class App {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field()
  version: string

  @Field()
  versionDescription: string

  @Field()
  author: string

  @Field(() => [String])
  developers: Array<string>
}
