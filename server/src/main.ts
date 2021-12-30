import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
  const logger = new Logger(bootstrap.name)
  logger.debug('Server running on 3000 port')
}
bootstrap()
