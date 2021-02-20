import { Author } from "src/author/entities/author.entity"
import { AppConfig } from "src/config/app.config"
import { App } from "../entities/app.entity"

export class AppDto implements App {
  name: string
  description?: string
  version: string
  versionDescription: string
  releasedAt: Date
  author: Author
  license: string

  constructor({
    name,
    description,
    version,
    versionDescription,
    author,
    license,
  }: AppConfig) {
    this.name = name
    this.description = description
    this.version = version
    this.versionDescription = versionDescription
    this.author = author
    this.license = license
    this.releasedAt = new Date()
  }
}
