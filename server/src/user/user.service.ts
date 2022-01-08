import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserModel } from './user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({})
  }
}
