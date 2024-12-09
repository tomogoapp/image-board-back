import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesResolver } from './replies.resolver';

@Module({
  providers: [RepliesResolver, RepliesService]
})
export class RepliesModule {}
