import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation(() => Channel)
  @UseGuards(GqlAuthGuard)
  @Auth()
  createChannel(
    @Args('createChannelInput')
    createChannelInput: CreateChannelInput,
    @GetUser() 
    user: User,
  
  ){
    return this.channelsService.create(createChannelInput,user);
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
