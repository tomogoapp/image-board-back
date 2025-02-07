import { HttpException, HttpStatus } from '@nestjs/common'

export class LoginFormException extends HttpException {
  constructor(field: string, message: string) {
    super({ field, message }, HttpStatus.UNAUTHORIZED)
  }
}