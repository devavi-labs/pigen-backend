import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { AppDto } from "./dto/app.dto"
import { App, AppDocument } from "./entities/app.entity"

@Injectable()
export class AppService {
  constructor(
    @InjectModel(App.name) private readonly appModel: Model<AppDocument>,
  ) {}

  async saveVersionDetails(appDto: AppDto): Promise<App> {
    const newApp = new this.appModel(appDto)
    return newApp.save()
  }

  async getlatestVersionDetails(): Promise<App> {
    const versions = await this.appModel.find().exec()
    return versions[versions.length - 1]
  }

  async getAllVersionDetails(): Promise<App[]> {
    return this.appModel.find().exec()
  }
}
