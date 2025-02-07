import { InputType, Int, Field } from '@nestjs/graphql'
import { IsString, IsInt, IsArray } from 'class-validator'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class CreateChannelInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  slug: string

  @Field()
  @IsString()
  description: string

  @Field(() => GraphQLJSON)
  @IsArray()
  rules: JSON

  @Field() // Número entero
  @IsInt()
  report_threshold: number

  @Field() // Número entero
  @IsInt()
  post_count: number

  @Field(() => GraphQLJSON)
  @IsArray()
  tag: JSON

  @Field()
  @IsString()
  theme: string
}
