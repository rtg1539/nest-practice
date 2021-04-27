import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import RuntimeError = WebAssembly.RuntimeError;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception instanceof HttpException ? exception.message : '');
    console.log(exception instanceof Error);
    // console.log(exception instanceof Error ? exception.message : '');

    response.status(200).json({
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
