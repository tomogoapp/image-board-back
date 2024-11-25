import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = exception.getResponse();
    const status = exception.getStatus();

    // Si `response` ya es un objeto, lo tomamos como está; si es una cadena, lo envolvemos.
    const errorResponse = typeof response === 'string'
      ? { message: response }
      : response;

    // Personalizamos el objeto de respuesta
    return {
      ...errorResponse,
      statusCode: status,
    };
  }
}
