import { Catch, HttpException, Logger } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { Response } from '../factory/response.factory'

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  logger = new Logger()

  catch(exception: HttpException) {
    this.logger.error(exception.stack ?? exception)

    return Response.create(false, exception.name)
  }
}
