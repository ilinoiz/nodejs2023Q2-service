import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MyLogger } from 'src/logging/my-logger.service';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private myLogger: MyLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();
    const req = context.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      this.logError(status, exception, req);

      res.status(status).json(exception.getResponse());
    } else {
      this.logError(HttpStatus.INTERNAL_SERVER_ERROR, exception, req);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  private logError(status: number, exception: any, req: Request) {
    this.myLogger.log(
      `Incoming request: Method = ${req.method} URL = ${
        req.url
      }, Body = ${JSON.stringify(req.body)}, QueryString = ${JSON.stringify(
        req.query,
      )} Response: statusCode = ${status}`,
    );

    if (status.toString().startsWith('4')) {
      this.myLogger.warn(
        `Not successful request. Exception = ${JSON.stringify(exception)}`,
      );
    } else if (status.toString().startsWith('5')) {
      this.myLogger.error(
        'Error occurred during request processing.',
        exception.stack,
        exception.message,
      );
    }
  }
}
