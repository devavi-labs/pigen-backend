import { Injectable } from "@nestjs/common"
import * as details from "./app.json"
import { App } from "./models/app.model"

@Injectable()
export class AppService {
  getAppDetails(): App {
    return {
      name: details.name,
      description: details.description,
      version: details.version,
      versionDescription: details.version_details,
      author: details.author,
      developers: details.developers,
    }
  }
}
