import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { JwtModule } from "src/jwt/jwt.module"
import { RegexpModule } from "src/regexp/regexp.module"
import { User, UserSchema } from "./entities/user.entity"
import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    RegexpModule,
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
