import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private myLogger: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.myLogger.log(
        `Incoming request: Method = ${req.method} URL = ${
          req.url
        }, Body = ${JSON.stringify(req.body)}, QueryString = ${JSON.stringify(
          req.query,
        )} Response: statusCode = ${res.statusCode}`,
      );
    });

    next();
  }
}
