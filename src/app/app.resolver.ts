import { Resolver, Query } from "@nestjs/graphql"
import { AppService } from "./app.service"
import { App } from "./entities/app.entity"

@Resolver(() => App)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => App)
  async latesVersionDetails(): Promise<App> {
    const versions = await this.appService.findAll()
    return versions[versions.length - 1]
  }
}
