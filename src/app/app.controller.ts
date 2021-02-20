import { AppService } from "./app.service"
import { ConfigService } from "@nestjs/config"
import { Controller, Logger } from "@nestjs/common"
import { APP, AppConfig } from "src/config/app.config"
import { AppDto } from "./dto/app.dto"

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    this.saveLatestVersionDetails()
  }

  private readonly logger = new Logger(AppController.name)

  async saveLatestVersionDetails(): Promise<void> {
    this.logger.log("Getting app's latest version details")
    const latestSavedVersionDetails = await this.appService.getlatestVersionDetails()

    if (
      latestSavedVersionDetails.version !==
      this.configService.get<AppConfig>(APP).version
    ) {
      this.logger.log("App's version is different")

      this.logger.log("Saving app's latest version details")
      await this.appService.saveVersionDetails(
        new AppDto(this.configService.get<AppConfig>(APP)),
      )
    } else {
      this.logger.log("App's latest version details is up-to-date")
    }
  }
}
