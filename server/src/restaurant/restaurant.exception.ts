import { HttpException, HttpStatus } from '@nestjs/common'

export class RestaurantNotFoundException extends HttpException {
  constructor() {
    super('Restaurant not found', HttpStatus.NOT_FOUND)
  }
}

export class RestaurantAuthorizedException extends HttpException {
  constructor() {
    super('Owner not authorized to restaurnat', HttpStatus.NOT_FOUND)
  }
}
