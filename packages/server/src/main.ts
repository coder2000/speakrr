import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { utilities as WinstonUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'verbose',
      format: winston.format.combine(
        winston.format.timestamp(),
        WinstonUtilities.format.nestLike(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'speakrr.log' }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
