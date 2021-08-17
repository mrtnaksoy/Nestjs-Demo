import { ExceptionFilter, Catch, ArgumentsHost,BadRequestException,HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class validationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        description:"Oops ! Seems you have not entered product data correctly OR missed some important data fields. Please check and try again"
      });
  }
}