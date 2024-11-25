import { forwardRef, Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { AuthModule } from 'src/auth/auth.module'
import { S3Module } from 'src/s3/s3.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    S3Module
  ],
  providers: [PostResolver, PostService],
  exports: [
    PostService
  ],
})
export class PostModule {}
