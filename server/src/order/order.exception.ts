import { HttpException, HttpStatus } from '@nestjs/common'
import { User } from 'src/user/schema/user.schema'
import { OrderStatus } from './order.schema'

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

export class OrderStatusNotAuthorizedException extends HttpException {
  constructor(user: User, status: OrderStatus) {
    super(`Order status "${status}" cannot be changed by "${user.role}"`, HttpStatus.FORBIDDEN)
  }
}

export class OrderAlreadyTakenException extends HttpException {
  constructor(driverId: string) {
    super(`Order already taken by other driver "${driverId}"`, HttpStatus.FORBIDDEN)
  }
}
