import { CanActivate,ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate{

  handleRequest(err, user, info) {
    // Si no hay usuario (no autenticado), permitir el acceso pero sin usuario en el contexto
    if (!user) {
      return null;
    }
    return user;
  }


  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}