import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserModel } from './user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

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
}
