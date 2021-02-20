import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthorModule } from "src/author/author.module"
import appConfig from "src/config/app.config"
import { AppController } from "./app.controller"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"
import { App, AppSchema } from "./entities/app.entity"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    MongooseModule.forRoot("mongodb://localhost:27017", {
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
