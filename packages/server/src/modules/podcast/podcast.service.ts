import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from '@entities/podcast.entity';
import { SpeakrrLogger } from '@modules/logger';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
    private readonly httpService: HttpService,
    private readonly logger: SpeakrrLogger,
  ) {
    this.logger.setContext('PodcastService');
  }

  findAll(): Promise<Podcast[]> {
    return this.podcastRepository.find();
  }

  findById(id: number): Promise<Podcast> {
    return this.podcastRepository.findOne(id);
  }

  async addByUrl(podcastUrl: string): Promise<Podcast> {
    //var feed = await this.httpService.get(podcastUrl).toPromise();
    this.logger.debug('Received url: ' + podcastUrl);
    return null;
  }
}
