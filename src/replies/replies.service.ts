import { forwardRef, Injectable } from '@nestjs/common'
import { CreateReplyInput } from './dto/create-reply.input'
import { UpdateReplyInput } from './dto/update-reply.input'
import { User } from 'src/auth/entities/user.entity'
import { Reply } from './entities/reply.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from 'src/channels/entities/channel.entity'
import { Repository } from 'typeorm'
import { Thread } from 'src/thread/entities/thread.entity'

@Injectable()
export class RepliesService {

  constructor(

    //@Inject(forwardRef(() => CommonService))
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,

    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,

    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>
  
  ){}

  async create(createReplyInput: CreateReplyInput,user:User,imageUrl:string):Promise<Reply> {
    const { thread: threadId, channel: slug, parent:parentId } = createReplyInput
    
    const channel = await this.channelRepository.findOne({ where: { slug: slug } });
    if (!channel) {
      throw new Error('Channel not found');
    }

    const thread = await this.threadRepository.findOne({ where:{ id:threadId }})

    if(!thread) {
      throw new Error('Thread not Found')
    }

    // Buscar el reply padre por su ID si se proporciona
    let parentReply: Reply | undefined;
    if (parentId) {
      parentReply = await this.replyRepository.findOne({ where: { id: parentId } });
        if (!parentReply) {
          throw new Error('Parent reply not found');
        }
    }


    const reply = this.replyRepository.create({
      ...createReplyInput,
      thread,
      parent: parentReply,
      image: imageUrl,
      createdBy:user,
      channel:channel
    })

    return this.replyRepository.save(reply)
  }

  findAll() {
    return `This action returns all replies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyInput: UpdateReplyInput) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
