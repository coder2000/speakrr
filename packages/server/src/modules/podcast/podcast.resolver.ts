import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { PodcastEntity } from '@entities/podcast.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { AuthorDto } from '@dto/author.dto';
import { EpisodeDto } from '@dto/episode.dto';
import { CategoryDto } from '@dto/category.dto';

@Resolver()
export class PodcastResolver extends CRUDResolver(PodcastDto, {
  create: { disabled: true },
  relations: {
    many: {
      episodes: { DTO: EpisodeDto, disableUpdate: true },
      categories: { DTO: CategoryDto, disableUpdate: true },
    },
    one: {
      author: { DTO: AuthorDto, disableUpdate: true, disableRemove: true },
    },
  },
}) {
  constructor(
    @InjectQueryService(PodcastEntity)
    podcastService: QueryService<PodcastEntity>,
  ) {
    super(podcastService);
  }
}
