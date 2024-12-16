import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Thread } from './entities/thread.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateThreadInput } from './dto/create-thread.input'
import { Post } from 'src/post/entities/post.entity'

@Injectable()
export class ThreadService {

    constructor(
        @InjectRepository(Thread)
        private readonly threadRepository: Repository<Thread>
    ){}

    async createThread(data: { post: Post }): Promise<Thread>{
        const thread = await this.threadRepository.create(data)
        return await this.threadRepository.save(thread)
    }

    async findThreadByPost(postId: string): Promise<Thread | null> {
        return this.threadRepository.findOne({
          where: { post: { id: postId } },
          relations: ['reply'], // Carga las replies asociadas
        });
      }

}
