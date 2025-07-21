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
        private readonly threadRepository: Repository<Thread>,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ){}

    async createThread(post: Post,user): Promise<Thread> {
      const thread = new Thread()
      thread.post = post // ✅ Asigna el Post al Thread
      thread.createdBy = user // ✅ Asigna el usuario al
  
      const savedThread = await this.threadRepository.save(thread)
  
      post.thread = savedThread // ✅ Asigna el Thread al Post
      await this.postRepository.save(post) // ✅ Guarda el Post actualizado
  
      return savedThread
    }

    async findThreadByPost(postId: string): Promise<Thread | null> {
      return this.threadRepository.findOne({
        where: { post: { id: postId } },
        relations: ['reply'], // Carga las replies asociadas
      });
    }

    async findAll(): Promise<Thread[]> {
      return this.threadRepository.find({ 
        relations: ["post", "reply"],
        order: { created_at: "DESC" }
      });
    }
  

}
