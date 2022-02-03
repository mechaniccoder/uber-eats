import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { GqlArgumentsHost, GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql'
import { Response } from '../factory/response.factory'

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host)
    const error = exception.getResponse()
    console.log('excpetion filter', typeof error)
    const message = typeof error === 'string' ? error : error['message']
    this.logger.error(error)
    return Response.create(false, message)
  }
}
