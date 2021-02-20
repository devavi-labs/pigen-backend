import { FieldError } from "src/fieldError/entities/fieldError.entity"
import { RegexpProvider } from "src/regexp/regexp.provider"
import { UserInput } from "../inputs/user.input"

export class UserInputValidator {
  private name?: string
  private username?: string
  private email?: string
  private password?: string
  private oldPassword?: string

  constructor({
    name,
    username,
    email,
    password,
    oldPassword,
  }: Partial<UserInput> & { oldPassword?: string }) {
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.oldPassword = oldPassword
  }

  private readonly regexpProvider = new RegexpProvider()

  private errors: Array<FieldError> = Array<FieldError>()

  validate(): Array<FieldError> {
    if (this.name && this.name.length < 3) {
      this.errors.push({
        field: "name",
        message: "The display name must be atleast 3 characters long.",
      })
    }

    if (this.username) {
      if (this.username.length < 3) {
        this.errors.push({
          field: "username",
          message: "The username must be atleast 3 characters long.",
        })
      }

      if (this.regexpProvider.containsSpecialCharacters.test(this.username)) {
        this.errors.push({
          field: "username",
          message:
            "The username must not contain any special characters like @.",
        })
      }
    }

    if (this.email && !this.regexpProvider.validEmail.test(this.email)) {
      this.errors.push({
        field: "email",
        message: "The email must be valid.",
      })
    }

    if (this.password && this.password.length < 6) {
      this.errors.push({
        field: "password",
        message: "The password must be atleast 6 characters long.",
      })
    }

    if (this.oldPassword && this.oldPassword.length < 6) {
      this.errors.push({
        field: "oldPassword",
        message: "The password must be atleast 6 characters long.",
      })
    }

    return this.errors.length > 0 ? this.errors : null
  }
}
