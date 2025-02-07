import { forwardRef, Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { AuthModule } from 'src/auth/auth.module'
import { S3Module } from 'src/s3/s3.module'
import { ChannelsModule } from 'src/channels/channels.module'
import { RepliesModule } from 'src/replies/replies.module'
import { ThreadModule } from 'src/thread/thread.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => ThreadModule),
    AuthModule,
    ChannelsModule,
    S3Module,
    RepliesModule,
    ThreadModule
  ],
  providers: [PostResolver, PostService],
  exports: [
    PostService,
    TypeOrmModule,
  ],
})
export class PostModule {}
