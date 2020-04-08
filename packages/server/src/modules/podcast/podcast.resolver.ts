import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from '@entities/podcast.entity';
import { PodcastInput } from './podcastDto/podcast.input';
import { PodcastService } from './podcast.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Query((returns) => Podcast)
  async getPodcast(@Args() podcastId: number): Promise<Podcast> {
    return this.podcastService.findById(podcastId);
  }

  @Mutation((returns) => Podcast)
  async addPodcast(@Args('podcastData') podcastData: PodcastInput) {
    return this.podcastService.addByUrl(podcastData.podcastUrl);
  }
}
