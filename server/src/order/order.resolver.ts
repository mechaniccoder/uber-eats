/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import mongoose from 'mongoose'
import { Restaurant } from 'src/restaurant/restaurant.schema'
import { PUB_SUB } from 'src/shared/common.constants'
import { AuthUser } from '../auth/auth-user.decorator'
import { Role } from '../auth/role.decorator'
import { Response } from '../shared/factory/response.factory'
import { User, UserRole } from '../user/schema/user.schema'
import { CreateOrderInput, CreateOrderRes } from './dto/create-order.dto'
import { GetOrderRes } from './dto/get-order.dto'
import { GetOrdersInput, GetOrdersRes } from './dto/get-orders.dto'
import { OrderupdatedInput } from './dto/order-updated.dto'
import { UpdateOrderInput, UpdateOrderRes } from './dto/update-order.dto'
import { COOKED_ORDER, ORDER_UPDATED, PENDING_ORDER } from './order.constants'
import { Order } from './order.schema'
import { OrderService } from './order.service'
import { TakeOrderInput, TakeOrderRes } from './dto/take-order.dto'

@Resolver((of) => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

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
  ) {
    const order = await this.orderService.getOrder(user, orderId)
    return Response.create(true, null, order)
  }

  @Mutation((returns) => UpdateOrderRes)
  public async updateOrder(
    @AuthUser() user: User,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    const updatedOrder = await this.orderService.update(user, updateOrderInput)
    return Response.create(true, null, updatedOrder)
  }

  @Role('owner')
  @Subscription((returns) => Order, {
    filter: (payload, _, context) => {
      const userId: mongoose.Types.ObjectId = context.user._id
      const ownerId: mongoose.Types.ObjectId = payload.pendingOrders.restaurant.owner
      return userId.equals(ownerId)
    },
  })
  pendingOrders() {
    return this.pubsub.asyncIterator(PENDING_ORDER)
  }

  @Role('delivery')
  @Subscription((returns) => Order, {
    filter: (payload, _, context) => {
      return true
    },
  })
  cookedOrders() {
    return this.pubsub.asyncIterator(COOKED_ORDER)
  }

  @Role('any')
  @Subscription((returns) => Order, {
    filter: (
      payload: {
        orderUpdated: Omit<Order, 'restaurant' | 'customer' | 'driver'> & {
          restaurant: Restaurant
          customer: User
          driver: User
        }
      },
      variables: OrderupdatedInput,
      { user }: { user: User },
    ) => {
      const { orderId: subscribedOrderId } = variables
      const updatedOrder = payload.orderUpdated
      const { id: updatedOrderId, customer, driver, restaurant } = updatedOrder

      if (!isUserRelativeToUpdatedOrder()) {
        return false
      }

      return updatedOrderId === subscribedOrderId

      function isUserRelativeToUpdatedOrder() {
        return !(
          customer.id !== user.id &&
          driver.id !== user.id &&
          restaurant.owner.equals(user.id)
        )
      }
    },
  })
  orderUpdated(@Args('orderId') orderId: string) {
    return this.pubsub.asyncIterator(ORDER_UPDATED)
  }

  @Mutation((returns) => TakeOrderRes)
  async takeOrder(
    @AuthUser() driver: User,
    @Args('takeOrderInput') takeOrderInput: TakeOrderInput,
  ) {
    const takenOrder = await this.orderService.takeOrder(driver, takeOrderInput)
    return Response.create(true, null, takenOrder)
  }
}
