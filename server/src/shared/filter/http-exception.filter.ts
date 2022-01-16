import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { Response } from '../factory/response.factory'

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.getResponse())
    return Response.create(false, exception.message)
  }
}
