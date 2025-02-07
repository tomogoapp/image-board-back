
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { META_ROLES } from 'src/auth/decorators/role-proctected.decorator'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
/* The UserRoleGuard class in TypeScript implements the CanActivate interface and checks for valid
roles based on metadata reflected from the handler in the context. */
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ){  

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler())

    if( !validRoles ) return true
    if( validRoles.length === 0 ) return true

    const ctx = GqlExecutionContext.create(context)
    const user: User = ctx.getContext().req.user

    if( !user ){
      throw new BadRequestException('user dont found')
    }

    // if (!token) {
    //   throw new UnauthorizedException('No token provided');
    // }

    // if (this.authService.isTokenBlacklisted(token)) {
    //   throw new UnauthorizedException('Token has been revoked');
    // }

    const hasRole = validRoles.some(role => user.roles.includes(role))
    if (hasRole) {
      return true;
    } else {
      throw new ForbiddenException(`User ${user.username} does not have the required role`);
    }

  }
}
