import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from './jwt.service'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  logger = new Logger()

  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if ('authorization' in req.headers) {
        const token = req.headers.authorization
        const decoded = this.jwtService.verify(token)
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.find({ _id: decoded.id })
          req['user'] = user
        }
      }
    } catch (err) {
      this.logger.error(err.message)
    } finally {
      next()
    }
  }
}
