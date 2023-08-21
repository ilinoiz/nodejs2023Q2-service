import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { MyLogger } from './logging/my-logger.service';
import { AllExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: false,
  });

  const myLogger = app.get(MyLogger);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(myLogger);
  app.useGlobalFilters(new AllExceptionFilter(myLogger));

  process
    .on('unhandledRejection', (reason) => {
      myLogger.error(`Unhandled rejection, reason: ${reason}`);
      process.exit(1);
    })
    .on('uncaughtException', (error: Error) => {
      myLogger.error(
        `Uncaught exception. Stack = ${error.stack}. Message = ${error.message}`,
      );
      process.exit(1);
    });
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 4000);
  // for levels testing
  // myLogger.error('Test error Message');
  // myLogger.debug('Test debug Message');
  // myLogger.log('Test log Message');
  // myLogger.warn('Test warn Message');
  // myLogger.verbose('Test verbose Message');
}
bootstrap();
