import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator'
import { Role } from 'src/auth/role.decorator'
import { Response } from 'src/shared/factory/response.factory'
import { User } from '../schema/user.schema'
import { CreatePaymentInput, CreatePaymentRes } from './dto/create-payment.dto'
import { GetPaymentsRes } from './dto/get-payments.dto'
import { PaymentService } from './payment.service'
import { Payment } from './payments.schema'

@Resolver((of) => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation((returns) => CreatePaymentRes)
  @Role('owner')
  async createPayment(
    @AuthUser() owner: User,
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentRes> {
    const payment = await this.paymentService.createPayment(owner, createPaymentInput)
    return Response.create(true, null, payment)
  }

  @Role('owner')
  @Query((returns) => GetPaymentsRes)
  async getPayments(@AuthUser() owner: User): Promise<GetPaymentsRes> {
    const payments = this.paymentService.getPayments(owner)
    return Response.create(true, null, payments)
  }
}
