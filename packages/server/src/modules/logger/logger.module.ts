import { Module } from '@nestjs/common';
import { SpeakrrLogger } from './speakrr.logger';

@Module({
  providers: [SpeakrrLogger],
  exports: [SpeakrrLogger],
})
export class LoggerModule {}
