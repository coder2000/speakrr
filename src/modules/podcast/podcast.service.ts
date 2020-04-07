import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Podcast } from '@entities/podcast.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
  ) {}

  findAll(): Promise<Podcast[]> {
    return this.podcastRepository.find();
  }
}
