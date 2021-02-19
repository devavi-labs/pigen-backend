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

  async save(appDto: AppDto): Promise<App> {
    const newApp = new this.appModel({ ...appDto, releasedAt: Date.now() })
    return newApp.save()
  }

  async findAll(): Promise<App[]> {
    return this.appModel.find().exec()
  }
}
