import { Resolver, Query } from "@nestjs/graphql"
import { AppService } from "./app.service"
import { App } from "./entities/app.entity"

@Resolver(() => App)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => App)
  latesVersionDetails(): Promise<App> {
    return this.appService.getlatestVersionDetails()
  }
}
