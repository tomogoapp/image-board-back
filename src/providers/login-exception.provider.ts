import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginException extends HttpException {
  constructor(field: string, message: string) {
    super({ field, message }, HttpStatus.UNAUTHORIZED);
  }
}