import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { TRoles } from './role.decorator'
import { User } from 'src/user/schema/user.schema'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<TRoles[]>(
      'roles',
      GqlExecutionContext.create(context).getHandler(),
    )

    if (typeof roles === 'undefined') return true

    const gqlContext = GqlExecutionContext.create(context).getContext()

    const user = gqlContext['user'] as User
    if (!user) return false

    if (roles.includes('any')) return true

    return roles.includes(user.role)
  }
}
