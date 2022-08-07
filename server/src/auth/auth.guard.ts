import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from 'src/jwt/jwt.service'
import { User } from 'src/user/schema/user.schema'
import { UserService } from 'src/user/user.service'
import { TRoles } from './role.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<TRoles[]>(
      'roles',
      GqlExecutionContext.create(context).getHandler(),
    )

    const gqlContext = GqlExecutionContext.create(context).getContext()

    if (typeof roles === 'undefined') return true

    const { token } = gqlContext

    const payload = this.jwtService.verify(token)

    if (typeof payload !== 'object' || !payload.hasOwnProperty('id')) {
      return false
    }

    const user = await this.userService.find({ _id: payload.id })

    if (!user) return false

    this.attachUserToContext(gqlContext, user)

    if (roles.includes('any')) return true

    return roles.includes(user.role)
  }

  private attachUserToContext(gqlContext: any, user: User) {
    gqlContext.user = user
  }
}
