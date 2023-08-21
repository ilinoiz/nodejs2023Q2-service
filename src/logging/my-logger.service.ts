import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { allLogLevels } from './logLevels';
import { FileLoggerService } from './file-logger.service';

@Injectable({ scope: Scope.DEFAULT })
export class MyLogger extends ConsoleLogger {
  constructor(private fileLogger: FileLoggerService) {
    super();
    this.setLogLevel(process.env.LOG_LEVEL);
  }

  log(message: any) {
    if (this.isLevelEnabled('log')) {
      super.log(message);
      this.fileLogger.info(message);
    }
  }

  error(message: any) {
    if (this.isLevelEnabled('error')) {
      super.error(message);
      this.fileLogger.error(message);
    }
  }

  warn(message: any) {
    if (this.isLevelEnabled('warn')) {
      super.warn(message);
      this.fileLogger.warn(message);
    }
  }

  debug(message: any) {
    if (this.isLevelEnabled('debug')) {
      super.debug(message);
      this.fileLogger.debug(message);
    }
  }

  verbose(message: any) {
    if (this.isLevelEnabled('verbose')) {
      super.verbose(message);
      this.fileLogger.verbose(message);
    }
  }

  private setLogLevel(currentLogLevel: string) {
    const level = allLogLevels.indexOf(currentLogLevel.toLowerCase());
    const logLevels = allLogLevels.slice(0, level + 1);
    this.setLogLevels(logLevels as LogLevel[]);
  }
}
