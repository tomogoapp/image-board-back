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
/**
 * The function createChannel takes in a CreateChannelInput and a User object, then calls the create
 * method of the channelsService with these inputs.
 * @param {CreateChannelInput} createChannelInput - The `createChannelInput` parameter is of type
 * `CreateChannelInput`, which likely contains the necessary data to create a new channel. This data
 * could include information such as the channel name, description, privacy settings, or any other
 * relevant details needed to create a channel.
 * @param {User} user - The `user` parameter in the `createChannel` function is of type `User` and is
 * obtained using the `@GetUser()` decorator. This means that the function expects to receive
 * information about the current user who is making the request.
 * @returns The `createChannel` function is returning the result of calling the `create` method from
 * the `channelsService` with the `createChannelInput` and `user` as arguments.
 */
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
