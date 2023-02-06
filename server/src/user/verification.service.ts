import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { VerifyCodeDto } from './dto/verify-code.dto'
import { User, UserModel } from './schema/user.schema'
import { CodeAlreadyVerifiedException, CodeNotMatchException } from './verification.exception'

@Injectable()
export class VerificationService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async verify(verifyCodeDto: VerifyCodeDto) {
    const { email, code } = verifyCodeDto

    const user = await this.userModel.findOne({ email })

    console.log(verifyCodeDto, user)

    if (user.verification.isVerified) throw new CodeAlreadyVerifiedException()

    if (user.verification.code !== code) throw new CodeNotMatchException()

    await this.userModel.findByIdAndUpdate(user.id, {
      'verification.isVerified': true,
    })
    return true
  }
}
