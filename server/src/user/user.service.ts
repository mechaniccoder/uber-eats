import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery } from 'mongoose'
import { MailService } from 'src/mail/mail.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { User, UserDocument, UserModel, UserWithoutPassword } from './schema/user.schema'
import { ExistException } from './user.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const exists = await this.userModel.findOne({ email: createUserDto.email })
    if (exists) {
      throw new ExistException()
    }

    const newUser = await this.userModel.create(createUserDto)

    /**
     * @todo fix this by correcting environment variables
     */
    await this.mailService.sendMail(
      `Verification code is ${newUser.verification.code}`,
      `Your verification code is  ${newUser.verification.code}`,
    )
  }

  async update(
    user: UserWithoutPassword,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UserWithoutPassword> {
    const updatedUser = await this.userModel.findByIdAndUpdate(user.id, updateProfileDto, {
      new: true,
    })
    return updatedUser
  }

  async login({ email, password }: LoginDto): Promise<string> {
    const user = await this.userModel.findOne({ email }, { password: 1 })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const passwordCorrect = await this.userModel.comparePassword(password, user.password)
    if (!passwordCorrect) throw new BadRequestException('Password not correct')

    const token = this.jwtService.sign({ id: user.id })

    return token
  }

  async find(query: FilterQuery<UserDocument>): Promise<User> {
    const user = await this.userModel.findOne(query, { __v: 0 })
    if (!user) throw new NotFoundException('User not found')

    return user
  }
}
