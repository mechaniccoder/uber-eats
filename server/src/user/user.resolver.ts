/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
import { CreateUserDto, CreateUserRes } from './dto/create-user.dto'
import { User, UserWithoutPassword } from './schema/user.schema'
import { UserService } from './user.service'
import { LoginDto, LoginRes } from './dto/login.dto'
import { AuthGuard } from '../auth/auth.guard'
import { AuthUser } from '../auth/auth-user.decorator'
import { MeRes } from './dto/me.dto'
import { ProfileArgs, ProfileRes } from './dto/profile.dto'
import { UpdateProfileDto, UpdateProfileRes } from './dto/update-profile.dto'
import { VerificationService } from './verification.service'
import { VerifyCodeDto, VerifyCodRes } from './dto/verify-code.dto'
import { Role } from 'src/auth/role.decorator'

@Resolver((of) => User)
export class UserResolver {
  logger = new Logger()

  constructor(
    private readonly userService: UserService,
    private readonly verificationService: VerificationService,
  ) {}

  @Mutation((returns) => CreateUserRes)
  async createUser(@Args('createUserArgs') createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto)
    return Response.create<UserWithoutPassword>(true, null, null)
  }

  @Mutation((returns) => LoginRes)
  async login(@Args('loginArgs') loginDto: LoginDto): Promise<LoginRes> {
    const token = await this.userService.login(loginDto)
    return Response.create<string>(true, null, token)
  }

  @Role('any')
  @Query((returns) => MeRes)
  async me(@AuthUser() user: UserWithoutPassword) {
    return Response.create(true, null, user)
  }

  @Role('any')
  @Query((returns) => ProfileRes)
  async profile(@Args() { id }: ProfileArgs) {
    const user = await this.userService.find({ _id: id })
    return Response.create(true, null, user)
  }

  @Role('any')
  @Mutation((returns) => UpdateProfileRes)
  async updateProfile(
    @AuthUser() user: UserWithoutPassword,
    @Args('updateProfileArgs') updateProfileDto: UpdateProfileDto,
  ): Promise<UpdateProfileRes> {
    const updatedUser = await this.userService.update(user, updateProfileDto)
    return Response.create(true, null, updatedUser)
  }

  @Mutation((returns) => VerifyCodRes)
  async verifyCode(
    @AuthUser() user: UserWithoutPassword,
    @Args('verifyCodeArgs') verifyCodeDto: VerifyCodeDto,
  ): Promise<VerifyCodRes> {
    await this.verificationService.verify(user, verifyCodeDto)
    return Response.create(true, null, null)
  }
}
