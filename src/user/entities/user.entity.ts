import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
@ObjectType()
export class User {
  @Field()
  _id?: string

  @Prop({ required: true })
  @Field()
  name: string

  @Prop({ required: true, unique: true })
  @Field()
  username: string

  @Prop({ required: true, unique: true })
  usernameLowerCase: string

  @Prop({ required: true, unique: true })
  @Field()
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  @Field()
  createdAt: Date

  @Prop({ required: true })
  @Field()
  publicKey: string

  @Prop()
  @Field(() => [String], { nullable: true })
  contacts: Array<string>
}

export const UserSchema = SchemaFactory.createForClass(User)
