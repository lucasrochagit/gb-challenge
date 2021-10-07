import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/module/app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
