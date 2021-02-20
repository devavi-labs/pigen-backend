import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Author } from "src/author/entities/author.entity"

export type AppDocument = App & Document

@Schema()
@ObjectType()
export class App {
  @Field()
  _id?: string

  @Prop({ required: true })
  @Field()
  name: string

  @Prop()
  @Field({ nullable: true })
  description?: string

  @Prop({ required: true, unique: true })
  @Field()
  version: string

  @Prop({ required: true })
  @Field()
  versionDescription: string

  @Prop()
  @Field()
  releasedAt: Date

  @Prop({ required: true, type: Author })
  @Field(() => Author)
  author: Author

  @Prop({ required: true })
  @Field(() => String)
  license: string
}

export const AppSchema = SchemaFactory.createForClass(App)
