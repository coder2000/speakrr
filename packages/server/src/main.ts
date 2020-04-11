import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { BunyanLoggerService } from '@eropple/nestjs-bunyan';
import { ROOT_LOGGER } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BunyanLoggerService(ROOT_LOGGER),
  });
  await app.listen(3000);
}

bootstrap();
