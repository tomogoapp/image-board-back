import { applyDecorators, UseGuards } from '@nestjs/common'
import { validRoles } from '../interface'
import { RoleProctected } from '.'
import { UserRoleGuard } from '../guards/user-role.guard'
import { GqlAuthGuard } from '../guards/gql-auth.guard'

export function Auth(...roles: validRoles[]) {
  return applyDecorators(
    RoleProctected(...roles),
    UseGuards(GqlAuthGuard, UserRoleGuard),
  )
}