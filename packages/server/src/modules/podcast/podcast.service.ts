import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Parser from 'rss-parser';
import { Podcast } from '@entities/podcast.entity';
import { SpeakrrLogger } from '@modules/logger';

@Injectable()
export class PodcastService {
  private rss: Parser;

  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
    private readonly httpService: HttpService,
    private readonly logger: SpeakrrLogger,
  ) {
    this.logger.setContext('PodcastService');
    this.rss = new Parser({
      customFields: {
        feed: ['language'],
      },
    });
  }

  findAll(): Promise<Podcast[]> {
    return this.podcastRepository.find();
  }

  findById(id: number): Promise<Podcast> {
    return this.podcastRepository.findOne(id);
  }

  async addByUrl(podcastUrl: string): Promise<Podcast> {
    this.logger.debug('Received url: ' + podcastUrl);
    var data = await this.rss.parseURL(podcastUrl);
    var podcast = this.podcastRepository.create();

    podcast.title = data.title;
    podcast.image = data.image.url;
    podcast.description = data.description;
    podcast.link = data.feedUrl;
    podcast.language = data.language;
    podcast.explicit = data.itunes.explicit === 'true' ? true : false;

    this.podcastRepository.save(podcast);

    return podcast;
  }
}
