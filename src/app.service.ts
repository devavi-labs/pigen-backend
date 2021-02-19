import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  greet(): string {
    return "Hello there! You've hit Pigen chat application's back-end public endpoint."
  }
}
