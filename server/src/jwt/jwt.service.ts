import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { JwtModuleOptions } from './interface/jwt-module-options'
import { CONFIG_OPTIONS } from './jwt.constant'
import * as jwt from 'jsonwebtoken'

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
}
