import {
  ConsoleLogger,
  Injectable,
  LogLevel,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { allLogLevels } from './logLevels';

@Injectable({ scope: Scope.DEFAULT })
export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevel(process.env.LOG_LEVEL);
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message);
  }

  private setLogLevel(currentLogLevel: string) {
    const level = allLogLevels.indexOf(currentLogLevel.toLowerCase());
    const logLevels = allLogLevels.slice(0, level + 1);
    this.setLogLevels(logLevels as LogLevel[]);
  }
}
