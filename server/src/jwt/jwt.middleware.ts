import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from './jwt.service'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
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
    } finally {
      next()
    }
  }
}
