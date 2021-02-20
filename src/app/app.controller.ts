import { AppService } from "./app.service"
import { ConfigService } from "@nestjs/config"
import { Controller } from "@nestjs/common"
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

  async saveLatestVersionDetails(): Promise<void> {
    const latestSavedVersionDetails = await this.appService.getlatestVersionDetails()

    if (
      latestSavedVersionDetails.version !==
      this.configService.get<AppConfig>(APP).version
    ) {
      await this.appService.saveVersionDetails(
        new AppDto(this.configService.get<AppConfig>(APP)),
      )
    }
  }
}
