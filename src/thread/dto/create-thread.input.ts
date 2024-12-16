import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"
import { Post } from "src/post/entities/post.entity"
import { Reply } from "src/replies/entities/reply.entity"

@InputType()
export class CreateThreadInput {
    @Field()
    @IsString()
    @IsOptional()
    post?:Post

    @Field()
    @IsString()
    @IsOptional()
    reply?:Reply[]
}