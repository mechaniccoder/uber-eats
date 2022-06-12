/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Order } from './order.schema'
import { OrderService } from './order.service'
import { CreateOrderInput, CreateOrderRes } from './dto/create-order.dto'
import { AuthUser } from '../auth/auth-user.decorator'
import { User, UserRole } from '../user/schema/user.schema'
import { Response } from '../shared/factory/response.factory'
import { Role } from '../auth/role.decorator'
import { GetOrdersInput, GetOrdersRes } from './dto/get-orders.dto'
import { GetOrderRes } from './dto/get-order.dto'

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Role(UserRole.customer)
  @Mutation((returns) => CreateOrderRes)
  public async createOrder(
    @AuthUser() customer: User,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderRes> {
    const order = await this.orderService.create(customer, createOrderInput)
    return Response.create(true, null, order)
  }

  @Role('any')
  @Query((returns) => GetOrdersRes)
  public async getOrders(
    @AuthUser() user: User,
    @Args('getOrderInput') getOrderInput: GetOrdersInput,
  ): Promise<GetOrdersRes> {
    const orders = await this.orderService.getOrders(user, getOrderInput)
    return Response.create(true, null, orders)
  }

  @Query((returns) => GetOrderRes)
  public async getOrder(
    @AuthUser() user: User,
    @Args('orderId', { type: () => String }) orderId: string,
  ): Promise<GetOrderRes> {
    const order = await this.orderService.getOrder(user, orderId)
    return Response.create(true, null, order)
  }
}
