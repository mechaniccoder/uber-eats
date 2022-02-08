import { Injectable } from '@nestjs/common'
import { VerifyCodeDto } from './dto/verify-code.dto'
import { User, UserModel, UserWithoutPassword } from './schema/user.schema'
import { CodeAlreadyVerifiedException, CodeNotMatchException } from './verification.exception'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class VerificationService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async verify(user: UserWithoutPassword, verifyCodeDto: VerifyCodeDto) {
    if (user.verification.isVerified) throw new CodeAlreadyVerifiedException()

    if (user.verification.code !== verifyCodeDto.code) throw new CodeNotMatchException()

    await this.userModel.findByIdAndUpdate(user.id, {
      'verification.isVerified': true,
    })
    return true
  }
}
