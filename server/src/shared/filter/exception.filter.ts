import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { GqlArgumentsHost, GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql'
import { Response } from '../factory/response.factory'

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host)
    const errorCause = exception.getResponse?.() || exception.message
    this.logger.error(errorCause)
    return Response.create(false, exception.name)
  }
}
