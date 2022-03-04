import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/user/schema/user.schema'

export type TRoles = keyof typeof UserRole | 'any'

export const Role = (...roles: TRoles[]) => SetMetadata('roles', roles)
