import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type AppDocument = App & Document

@Schema()
@ObjectType()
export class App {
  @Field()
  _id: string

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

  @Prop({ required: true })
  @Field()
  author: string

  @Prop({ required: true })
  @Field(() => [String])
  developers: Array<string>
}

export const AppSchema = SchemaFactory.createForClass(App)
