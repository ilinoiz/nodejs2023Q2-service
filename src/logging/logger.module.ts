import { Global, Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';
import { FileLoggerService } from './file-logger.service';

@Global()
@Module({
  providers: [MyLogger, FileLoggerService],
  exports: [MyLogger],
})
export class LoggerModule {}
