import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
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
  async createUser(@Args('createUserArgs') createUserDto: CreateUserDto) {
    const [error, data] = await this.userService.create(createUserDto)
    if (error) {
      return Response.create<User>(false, error, data)
    }

    return Response.create<User>(true, null, data)
  }
}
