import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthorModule } from "src/author/author.module"
import appConfig from "src/config/app.config"
import jwtConfig from "src/config/jwt.config"
import mongoConfig, { MONGO, MongoConfig } from "src/config/mongo.config"
import { GqlConfigService } from "src/gql/gqlConfig.service"
import { JwtModule } from "src/jwt/jwt.module"
import { RegexpModule } from "src/regexp/regexp.module"
import { UserModule } from "src/user/user.module"
import { AppController } from "./app.controller"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"
import { App, AppSchema } from "./entities/app.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, mongoConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<MongoConfig>(MONGO).url,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
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
