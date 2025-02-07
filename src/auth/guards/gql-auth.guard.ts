import { CanActivate,ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate{

  constructor(private readonly jwtService: JwtService) {
    super()
  }

  // handleRequest(err, user, info) {
  //   // Si no hay usuario (no autenticado), permitir el acceso pero sin usuario en el contexto
  //   if (!user) {
  //     return null;
  //   }
  //   return user;
  // }


  // getRequest(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   return ctx.getContext().req;
  // }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    const token = req.cookies?.['auth_token']

    if(!token) {
      throw new UnauthorizedException('No auth token found')
    }

    try{
      const payload = this.jwtService.verify(token)
      req.user = payload
      return true
    }catch(error){
      throw new UnauthorizedException('Invalid token')
    }

  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // Extraer el token desde las cookies
    const token = req.cookies?.['auth_token'];
    if (!token) {
      throw new UnauthorizedException('No hay token de autenticación en las cookies');
    }

    // Verificar el token manualmente usando el JwtService
    try {
      const payload = this.jwtService.verify(token);
      req['user'] = payload; // Añade el usuario autenticado al request
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    return req;
  } 

}