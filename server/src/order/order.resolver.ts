/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Order } from './order.schema'
import { OrderService } from './order.service'
import { CreateOrderInput, CreateOrderRes } from './dto/create-order.dto'
import { AuthUser } from '../auth/auth-user.decorator'
import { User, UserRole } from '../user/schema/user.schema'
import { Response } from '../shared/factory/response.factory'
import { Role } from '../auth/role.decorator'

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Role(UserRole.customer)
  @Mutation((returns) => CreateOrderRes)
  async createOrder(
    @AuthUser() customer: User,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderRes> {
    const order = await this.orderService.create(customer, createOrderInput)
    return Response.create(true, null, order)
  }
}
