import { Injectable } from "@nestjs/common"
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql"
import { GqlContext } from "./gql.context"

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      context: ({ req, res }) => new GqlContext({ req, res }),
    }
  }
}
