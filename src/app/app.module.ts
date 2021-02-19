import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
