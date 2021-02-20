import { User } from "../entities/user.entity"

export class UserDto implements User {
  name: string
  username: string
  usernameLowerCase: string
  email: string
  password: string
  createdAt: Date
  publicKey: string
  contacts: Array<string>

  constructor({
    name,
    username,
    email,
    password,
    publicKey,
    contacts,
  }: Partial<Omit<User, "usernameLowerCase">>) {
    this.name = name
    this.username = username
    this.usernameLowerCase = username.toLowerCase()
    this.email = email.toLowerCase()
    this.password = password
    this.createdAt = new Date()
    this.publicKey = publicKey
    this.contacts = contacts
  }
}
