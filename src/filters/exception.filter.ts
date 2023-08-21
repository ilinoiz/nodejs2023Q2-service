import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MyLogger } from 'src/logging/my-logger.service';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private myLogger: MyLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      this.logError(status, exception);

      res.status(status).json(exception.getResponse());
    } else {
      this.logError(HttpStatus.INTERNAL_SERVER_ERROR, exception);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  private logError(status: number, exception: any) {
    if (status.toString().startsWith('4')) {
      this.myLogger.warn(
        `Not successful request. Message = ${exception.message}.`,
      );
    } else if (status.toString().startsWith('5')) {
      this.myLogger.error(
        `Error occurred during request processing. Message = ${exception.message}. Stack = ${exception.stack}.`,
      );
    }
  }
}
