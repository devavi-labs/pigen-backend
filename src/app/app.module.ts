import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
