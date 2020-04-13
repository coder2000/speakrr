import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@modules/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useLogger(app.get(Logger));
  await app.listen(3000);
}

bootstrap();
