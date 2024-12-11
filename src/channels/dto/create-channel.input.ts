import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsInt, IsArray } from 'class-validator';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  slug: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [String]) // Array de cadenas
  @IsArray()
  rules: string[];

  @Field(() => Int) // Número entero
  @IsInt()
  report_threshold: number;

  @Field(() => Int) // Número entero
  @IsInt()
  post_count: number;

  @Field(() => [String]) // Array de cadenas
  @IsArray()
  tag: string[];

  @Field(() => String)
  @IsString()
  theme: string;
}
