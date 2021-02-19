import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"
import { MongooseModule } from "@nestjs/mongoose"
import { App, AppSchema } from "./entities/app.entity"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017", {
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
