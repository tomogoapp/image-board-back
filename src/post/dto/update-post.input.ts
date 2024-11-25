import { CreatePostDto } from './create-post.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePostInput extends PartialType(CreatePostDto) {
  @Field(() => Int)
  id: number;
}
