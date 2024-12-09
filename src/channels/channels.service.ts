import { Injectable } from '@nestjs/common';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';

@Injectable()
export class ChannelsService {
  create(createChannelInput: CreateChannelInput) {
    return 'This action adds a new channel';
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
