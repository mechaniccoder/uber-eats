import { HttpException, HttpStatus } from '@nestjs/common'

export class DishNotFoundException extends HttpException {
  constructor() {
    super('Dish not found', HttpStatus.BAD_REQUEST)
  }
}
