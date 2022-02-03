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
import { User, UserDocument, UserModel } from './user.schema'
import { LoginDto } from './dto/login.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'
import { FilterQuery } from 'mongoose'

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
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const newUser = new this.userModel(createUserDto)
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

  async find(query: FilterQuery<UserDocument>): Promise<User> {
    try {
      return this.userModel.findOne(query, { password: 0, __v: 0 })
    } catch (err) {
      throw new BadGatewayException('Error occurred while find user')
    }
  }
}
