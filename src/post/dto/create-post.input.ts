
// src/post/dto/create-post.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty,IsOptional } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  content: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  image?:string 

  @Field()
  @IsBoolean()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  anonPost: boolean
}
