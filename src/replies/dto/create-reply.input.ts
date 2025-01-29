import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Thread } from 'src/thread/entities/thread.entity';
import { Reply } from '../entities/reply.entity';

@InputType()
export class CreateReplyInput {
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

  @Field()
  @IsString()
  channel: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  parent?: string // Cambiado a string para aceptar el ID del reply padre

  @Field()
  @IsString()
  @IsNotEmpty({message:'thread is necesary'})
  thread: string



}
