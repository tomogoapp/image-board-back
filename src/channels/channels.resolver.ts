import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation(() => Channel)
  createChannel(@Args('createChannelInput') createChannelInput: CreateChannelInput) {
    return this.channelsService.create(createChannelInput);
  }

  @Query(() => [Channel], { name: 'channels' })
  findAll() {
    return this.channelsService.findAll();
  }

  @Query(() => Channel, { name: 'channel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelsService.findOne(id);
  }

  @Mutation(() => Channel)
  updateChannel(@Args('updateChannelInput') updateChannelInput: UpdateChannelInput) {
    return this.channelsService.update(updateChannelInput.id, updateChannelInput);
  }

  @Mutation(() => Channel)
  removeChannel(@Args('id', { type: () => Int }) id: number) {
    return this.channelsService.remove(id);
  }
}
