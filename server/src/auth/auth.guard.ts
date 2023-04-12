import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/schema/user.schema'
import { UserService } from 'src/user/user.service'
import { TRoles } from './role.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<TRoles[]>(
      'roles',
      GqlExecutionContext.create(context).getHandler(),
    )

    const gqlContext = GqlExecutionContext.create(context).getContext()

    if (typeof roles === 'undefined') return true

    const { token } = gqlContext

    const secret = this.configService.get('JWT_PRIVATE_KEY')
    const payload = this.jwtService.verify(token, {
      secret,
    })
    if (!this.validateTokenPayload(payload)) {
      return false
    }

    const user = await this.userService.find({ _id: payload.id })
    if (!user) return false

    this.attachUserToContext(gqlContext, user)

    if (roles.includes('any')) return true

    return roles.includes(user.role)
  }

  private validateTokenPayload<T>(payload: unknown): payload is T & { id: string } {
    return typeof payload === 'object' && 'id' in payload
  }

  private attachUserToContext(gqlContext: any, user: User) {
    gqlContext.user = user
  }
}
