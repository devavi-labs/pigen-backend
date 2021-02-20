import { Logger } from "@nestjs/common"
import { Resolver, Query } from "@nestjs/graphql"
import { AppService } from "./app.service"
import { App } from "./entities/app.entity"

@Resolver(() => App)
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppResolver.name)

  @Query(() => App)
  latesVersionDetails(): Promise<App> {
    this.logger.log(
      this.latesVersionDetails.name,
      `${AppResolver.name} - Query`,
    )

    this.logger.log("Getting and returning app's latest version details")
    return this.appService.getlatestVersionDetails()
  }
}
