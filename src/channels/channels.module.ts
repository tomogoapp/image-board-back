import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule
  ],
  providers: [ChannelsResolver, ChannelsService]
})
export class ChannelsModule {}
