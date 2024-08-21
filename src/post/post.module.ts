import { forwardRef, Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule
  ],
  providers: [PostResolver, PostService],
  exports: [
    PostService
  ],
})
export class PostModule {}
