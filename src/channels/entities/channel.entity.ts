import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Channel {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  hash: string;

  @Field()
  name: string
}
