import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Channel]),
    AuthModule
  ],
  providers: [ChannelsResolver, ChannelsService]
})
export class ChannelsModule {}
