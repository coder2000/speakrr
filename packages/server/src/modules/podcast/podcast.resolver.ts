import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';
import { PodcastInput } from './podcastDto/podcast.input';
import { PodcastService } from './podcast.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Query((returns) => Podcast)
  async getPodcast(
    @Args('podcastId', { type: () => Int }) podcastId: number,
  ): Promise<Podcast> {
    return this.podcastService.findById(podcastId);
  }

  @Mutation((returns) => Queue)
  async addPodcast(@Args('podcastData') podcastData: PodcastInput) {
    return this.podcastService.addByUrl(podcastData.podcastUrl);
  }
}
