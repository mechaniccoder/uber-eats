import { HttpException, HttpStatus } from '@nestjs/common'

export class OrderNotFoundException extends HttpException {
  constructor() {
    super('Order Not Found', HttpStatus.NOT_FOUND)
  }
}

export class OrderNotAuthorizedException extends HttpException {
  constructor() {
    super('Order Not Authorized', HttpStatus.FORBIDDEN)
  }
}
