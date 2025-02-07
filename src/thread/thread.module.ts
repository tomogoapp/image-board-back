import { forwardRef, Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { ThreadResolver } from './thread.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from 'src/post/post.module'
import { RepliesModule } from 'src/replies/replies.module'
import { Thread } from './entities/thread.entity'

@Module({
  providers: [ThreadResolver, ThreadService],
  imports: [
    TypeOrmModule.forFeature([Thread]),
    forwardRef(() => PostModule),
    forwardRef(() => RepliesModule),
    //PostModule,
  ],
  exports:[
    ThreadModule,
    ThreadService,
    TypeOrmModule
  ]
})
export class ThreadModule {}
