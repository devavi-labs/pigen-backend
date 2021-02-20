import { Module } from "@nestjs/common"
import { RegexpProvider } from "./regexp.provider"

@Module({ providers: [RegexpProvider], exports: [RegexpProvider] })
export class RegexpModule {}
