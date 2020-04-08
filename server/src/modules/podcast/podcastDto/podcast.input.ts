import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PodcastInput {
  @Field()
  podcastUrl: string;
}
