import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RepliesService } from './replies.service'
import { Reply } from './entities/reply.entity'
import { CreateReplyInput } from './dto/create-reply.input'
import { UpdateReplyInput } from './dto/update-reply.input'
import { S3Service } from 'src/s3/s3.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'

@Resolver(() => Reply)
export class RepliesResolver {
  constructor(
    private readonly repliesService: RepliesService,
    private readonly s3Service: S3Service
  ) {}
  

  @Mutation(() => Reply, { name: 'new_reply' })
  @UseGuards(GqlAuthGuard)
  @Auth()
  async createReply(
    @Args('createReplyInput') createReplyInput: CreateReplyInput,
    @GetUser() user: User,
    @Args({ name:'image', type:() => GraphQLUpload,nullable:true })
    image: FileUpload
  ): Promise<Reply>{

    let imageUrl: string | undefined

    if(image){
      const {createReadStream, filename,mimetype} = image

      if(!['image/jpeg','image/png','image/webp','image/gif'].includes(mimetype)){
        throw new Error ('image type doenst supported')
      }

      const fileStream = createReadStream()
      const fileKey = `${Date.now()}-${filename}`

      imageUrl = await this.s3Service.uploadFile(fileKey,fileStream,mimetype)
    }

    return this.repliesService.create(createReplyInput,user,imageUrl);
  }

  @Query(() => [Reply], { name: 'replies' })
  findAll() {
    return this.repliesService.findAll();
  }

  @Query(() => Reply, { name: 'reply' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.repliesService.findOne(id);
  }

  @Mutation(() => Reply)
  updateReply(@Args('updateReplyInput') updateReplyInput: UpdateReplyInput) {
    return this.repliesService.update(updateReplyInput.id, updateReplyInput);
  }

  @Mutation(() => Reply)
  removeReply(@Args('id', { type: () => Int }) id: number) {
    return this.repliesService.remove(id);
  }
}
