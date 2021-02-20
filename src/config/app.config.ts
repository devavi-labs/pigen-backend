import { registerAs } from "@nestjs/config"

export interface AppConfig {
  name: string
  description: string
  author: {
    name: string
    email: string
    url: string
  }
  version: string
  versionDescription: string
  license: string
}

export const APP = "APP"

export default registerAs<() => AppConfig>(APP, () => ({
  name: process.env.npm_package_app_name,
  description: process.env.npm_package_description,
  author: {
    name: process.env.npm_package_author_name,
    email: process.env.npm_package_author_email,
    url: process.env.npm_package_author_url,
  },
  version: process.env.npm_package_version,
  versionDescription: process.env.npm_package_version_description,
  license: process.env.npm_package_license,
}))
