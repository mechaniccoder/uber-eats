import { Logger, UseGuards } from '@nestjs/common'
import {
  Args,
  ArgsType,
  Context,
  Mutation,
  ObjectType,
  OmitType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
import { CreateUserDto, CreateUserRes } from './dto/create-user.dto'
import { User } from './user.schema'
import { UserService } from './user.service'
import { LoginDto, LoginRes } from './dto/login.dto'
import { AuthGuard } from '../auth/auth.guard'
import { AuthUser } from '../auth/auth-user.decorator'
import { MeRes } from './dto/me.dto'
import { Profiler } from 'inspector'
import { ProfileArgs, ProfileRes } from './dto/profile.dto'

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
    const token = await this.userService.login(loginDto)
    return Response.create<string>(true, null, token)
  }

  @UseGuards(AuthGuard)
  @Query((returns) => MeRes)
  async me(@AuthUser() user: Omit<User, 'password'>) {
    return user
  }

  @UseGuards(AuthGuard)
  @Query((returns) => ProfileRes)
  async profile(@Args() { id }: ProfileArgs) {
    const user = await this.userService.find({ _id: id })
    return Response.create(true, null, user)
  }
}
