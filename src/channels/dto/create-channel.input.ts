import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
