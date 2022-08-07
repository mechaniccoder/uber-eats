import { Inject, Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { JwtModuleOptions } from './interface/jwt-module-options'
import { CONFIG_OPTIONS } from './jwt.constant'

@Injectable()
export class JwtService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}

  sign(payload: any): string {
    return jwt.sign(payload, this.options.privateKey, {
      expiresIn: '24h',
    })
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey)
  }

  validatePayload<T>(payload: T): payload is T & { id: string } {
    if (typeof payload !== 'object' || !payload.hasOwnProperty('id')) return false
    return true
  }
}
