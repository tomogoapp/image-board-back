import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { ThreadService } from './thread.service'
import { Thread } from './entities/thread.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'

@Resolver(() => Thread)
export class ThreadResolver {
  constructor(
    private readonly threadService: ThreadService
  ) {}

  // @Mutation(() => Thread, {name: 'create_connection'})
  // async createThreadConection ()
  @Query(() => [Thread], { name: "threads" })
  @UseGuards(GqlAuthGuard)
  async findAll(): Promise<Thread[]> {
    return this.threadService.findAll()
  }

}
