import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDto, CreateUserRes } from './dto/create-user.dto'
import { User } from './user.schema'
import { UserService } from './user.service'

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Mutation((returns) => CreateUserRes)
  createUser(@Args('createUserArgs') createUserDto: CreateUserDto) {
    return
  }
}
