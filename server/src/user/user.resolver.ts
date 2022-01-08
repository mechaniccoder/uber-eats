import { Query, Resolver } from '@nestjs/graphql'
import { User } from './user.schema'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll()
  }
}
