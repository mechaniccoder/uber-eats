import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
import { CreateUserDto, CreateUserRes } from './dto/create-user.dto'
import { User } from './user.schema'
import { UserService } from './user.service'
import { LoginDto, LoginRes } from './dto/login.dto'

@Resolver((of) => User)
export class UserResolver {
  logger = new Logger()

  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Mutation((returns) => CreateUserRes)
  async createUser(@Args('createUserArgs') createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto)
    return Response.create<User>(true, null, newUser)
  }

  @Mutation((returns) => LoginRes)
  async login(@Args('loginArgs') loginDto: LoginDto): Promise<LoginRes> {
    return {
      ok: true,
      error: null,
      data: true,
    }
  }
}
