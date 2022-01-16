import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.getResponse())

    return {
      ok: false,
      error: exception.message,
      statusCode: exception.getStatus(),
    }
  }
}
