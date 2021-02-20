import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type AuthorDocument = Author & Document

@Schema()
@ObjectType()
export class Author {
  @Prop({ required: true })
  @Field()
  name: string

  @Prop({ required: true })
  @Field()
  email: string

  @Prop({ required: true })
  @Field()
  url: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
