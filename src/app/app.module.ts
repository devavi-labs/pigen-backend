import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthorModule } from "src/author/author.module"
import appConfig from "src/config/app.config"
import jwtConfig from "src/config/jwt.config"
import { JwtModule } from "src/jwt/jwt.module"
import { RegexpModule } from "src/regexp/regexp.module"
import { UserModule } from "src/user/user.module"
import { AppController } from "./app.controller"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"
import { App, AppSchema } from "./entities/app.entity"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, jwtConfig] }),
    MongooseModule.forRoot("mongodb://localhost:27017", {
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    AuthorModule,
    JwtModule,
    UserModule,
    RegexpModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
