import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Author, AuthorSchema } from "./entities/author.entity"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
})
export class AuthorModule {}
