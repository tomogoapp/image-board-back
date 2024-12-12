import { Injectable } from '@nestjs/common';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { User } from 'src/auth/entities/user.entity';
import { Channel } from './entities/channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>

  ){}

  async create(createChannelInput: CreateChannelInput, user: User): Promise<Channel> {

    const { name,slug } = createChannelInput

    const find = await this.channelRepository.count({
      where: [
        { name: name },
        { slug: slug }
      ]
    });


    if(find === 1){
      throw new Error("A channel with this name or slug already exists.");
    }else{
      const channel = this.channelRepository.create({
        ...createChannelInput,
        creator_id: user
      });
      return this.channelRepository.save(channel);
    }


  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelInput: UpdateChannelInput) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
