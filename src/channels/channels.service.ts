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

  create(createChannelInput: CreateChannelInput, user: User) {
    const channel = this.channelRepository.create({
      ...createChannelInput,
      creator_id: user, // Asignar el objeto de usuario directamente a la relación ManyToOne
      rules: createChannelInput.rules, // Esto ya es JSON compatible
      tag: createChannelInput.tag,   // También JSON compatible
    })
    return this.channelRepository.save(channel)
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
