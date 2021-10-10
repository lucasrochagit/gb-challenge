import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AllExceptionsFilter } from './config/filter/exception.filter';
import { AppModule } from './config/module/app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  setMiddlewares(app);
  await app.listen(PORT);
}

function setMiddlewares(app: INestApplication): void {
  const httpRequestLogger: Logger = new Logger('HTTPRequest');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(
    morgan(
      ':remote-addr :remote-user [:date[iso]] ":method :url HTTP/:http-version" ' +
        ':status :res[content-length] :response-time ms ":referrer" ":user-agent"',
      {
        stream: { write: (str: string) => httpRequestLogger.log(str) },
      },
    ),
  );
}

bootstrap();
