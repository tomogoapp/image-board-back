import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectIfAuthenticatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.cookies?.auth_token; // Usando cookies
    
    if (authToken) {
      // Redirige al usuario logueado
      return res.redirect('/channel'); // Cambia la ruta según corresponda
    }
    next();
  }
}
