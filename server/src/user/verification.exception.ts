import { HttpException, HttpStatus } from '@nestjs/common'

export class CodeNotMatchException extends HttpException {
  constructor() {
    super('Code not match', HttpStatus.BAD_REQUEST)
  }
}

export class CodeAlreadyVerifiedException extends HttpException {
  constructor() {
    super('Code already verified', HttpStatus.BAD_REQUEST)
  }
}
