import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { MyLogger } from './logging/my-logger.service';
import { LoggerMiddleware } from './logging/logger.middleware';
import { AllExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: true,
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
      myLogger.error('Uncaught exception', error.stack, error.message);
      process.exit(1);
    });
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 4000);
}
bootstrap();
