import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument, UserModel, UserWithoutPassword } from './schema/user.schema'
import { LoginDto } from './dto/login.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'
import { FilterQuery } from 'mongoose'
import { ExistException } from './user.exception'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { MailService } from 'src/mail/mail.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const exists = await this.userModel.findOne({ email: createUserDto.email })
    if (exists) {
      throw new ExistException()
    }

    const newUser = await this.userModel.create(createUserDto)

    await this.mailService.sendMail(
      `Verification code is ${newUser.verification.code}`,
      'verification',
      [
        {
          name: 'code',
          value: newUser.verification.code,
        },
        {
          name: 'username',
          value: newUser.email,
        },
      ],
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

  async find(query: FilterQuery<UserDocument>): Promise<UserWithoutPassword> {
    const user = await this.userModel.findOne(query, { __v: 0 })
    if (!user) throw new NotFoundException('User not found')

    return user
  }
}
