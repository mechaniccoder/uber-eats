import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/user/schema/user.schema'

type TRoles = keyof typeof UserRole

export const Role = (...roles: TRoles[]) => SetMetadata('roles', roles)
