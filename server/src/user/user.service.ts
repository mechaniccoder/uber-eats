import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument, UserModel, UserWithoutPassword } from './user.schema'
import { LoginDto } from './dto/login.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'
import { FilterQuery } from 'mongoose'
import { ExistException } from './user.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({})
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userModel.findOne({ email: createUserDto.email })
    if (exists) {
      throw new ExistException()
    }

    const newUser = new this.userModel(createUserDto, { password: 0 })
    await newUser.save()
    return newUser
  }

  async login({ email, password }: LoginDto): Promise<string> {
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const passwordCorrect = await this.userModel.comparePassword(password, user.password)
    if (!passwordCorrect) throw new BadRequestException('Password not correct')

    const token = this.jwtService.sign({ id: user._id })
    return token
  }

  async find(query: FilterQuery<UserDocument>): Promise<UserWithoutPassword> {
    const user = await this.userModel.findOne(query, { password: 0, __v: 0 })
    if (!user) throw new NotFoundException('User not found')

    return user
  }
}
