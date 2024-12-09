import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';

@Module({
  providers: [ChannelsResolver, ChannelsService]
})
export class ChannelsModule {}
