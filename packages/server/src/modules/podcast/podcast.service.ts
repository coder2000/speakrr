import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from '@entities/podcast.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
    private readonly httpService: HttpService,
  ) {}

  findAll(): Promise<Podcast[]> {
    return this.podcastRepository.find();
  }

  findById(id: number): Promise<Podcast> {
    return this.podcastRepository.findOne(id);
  }

  async addByUrl(podcastUrl: string): Promise<Podcast> {
    var feed = await this.httpService.get(podcastUrl).toPromise();

    return null;
  }
}
