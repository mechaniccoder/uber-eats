import { HttpException, HttpStatus } from '@nestjs/common'

export class ExistException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.BAD_REQUEST)
  }
}
