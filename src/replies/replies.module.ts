import { forwardRef, Module } from '@nestjs/common'
import { RepliesService } from './replies.service'
import { RepliesResolver } from './replies.resolver'
import { AuthModule } from 'src/auth/auth.module'
import { PostModule } from 'src/post/post.module'
import { ChannelsModule } from 'src/channels/channels.module'
import { Reply } from './entities/reply.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { S3Module } from 'src/s3/s3.module'
import { ThreadModule } from 'src/thread/thread.module'

@Module({
  providers: [RepliesResolver, RepliesService],
  imports:[
    TypeOrmModule.forFeature([Reply]),
    forwardRef(() => ThreadModule), // Ajuste aquí
    AuthModule,
    ChannelsModule,
    S3Module
  ],
  exports: [
    RepliesModule,
    TypeOrmModule,
  ],
})
export class RepliesModule {}
