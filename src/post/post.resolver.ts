import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'
import { validRoles } from 'src/auth/interface'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

/* The code snippet `@Query(() => [Post], { name: 'posts' })` in the `PostResolver` class is defining a
GraphQL query named `posts` that returns an array of `Post` entities. */
  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

/**
 * This TypeScript function creates a new post with a title, content, and user information.
 * @param {string} title - The `title` parameter is a string that represents the title of the post
 * being created.
 * @param {string} content - The `content` parameter in the `createPost` function is a string that
 * represents the content of the post that the user wants to create. It is one of the arguments
 * required for creating a new post.
 * @param {User} user - The `user` parameter in the `createPost` function is of type `User`. It is
 * likely used to identify the user who is creating the post. This parameter is decorated with
 * `@GetUser()`, which suggests that it is being extracted from the request context or session. This
 * way,
 * @returns The `createPost` method is returning a Promise that resolves to a `Post` object.
 */
  @Mutation(() => Post)
  @Auth()
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postService.create(title, content,user);
  }

/* The `deletePost` mutation in the `PostResolver` class is a GraphQL mutation that takes an `id`
argument of type string and returns a Promise that resolves to a string. This mutation is likely
used to delete a post from the database permanently by calling the `delete` method from the
`postService` instance, passing the `id` of the post to be deleted. The `delete` method likely
handles the logic to remove a post from the database permanently. */
  @Mutation(() => String)
  deletePost(
    @Args(
      'id'
    ) id: string): Promise<String>
    {
      return this.postService.delete(id)
    }
  
/* The `removePost` mutation in the `PostResolver` class is a GraphQL mutation that takes an `id`
argument of type string and returns a Promise that resolves to a string. This mutation is likely
used to permanently remove a post from the database by calling the `remove` method from the
`postService` instance, passing the `id` of the post to be removed. The `remove` method likely
handles the logic to delete a post from the database permanently. */
  @Mutation(() => String)
  removePost(
    @Args(
      'id'
    ) id:string): Promise<String>
    {
      return this.postService.remove(id)
    }

/* The `restorePost` mutation in the `PostResolver` class is a GraphQL mutation that takes an `id`
argument of type string and returns a Promise that resolves to a `Post` entity. This mutation is
used to restore a previously deleted post by calling the `restore` method from the `postService`
instance, passing the `id` of the post to be restored. The `restore` method likely handles the logic
to restore a post from a soft-deleted state to an active state in the database. */
  @Mutation(() => Post)
  restorePost(
    @Args(
      'id'
    ) id:string): Promise<Post>
    {
      return this.postService.restore(id)
    }

/* The `findOnePost` mutation in the `PostResolver` class is a GraphQL mutation that takes an `id`
argument of type string and returns a Promise that resolves to a `Post` entity. This mutation is
likely used to find and return a specific post based on the provided `id` by calling the `findOne`
method from the `postService` instance, passing the `id` of the post to be retrieved. The `findOne`
method likely handles the logic to fetch a single post entity from the database based on the
provided `id`. */
  @Query(() => Post)
  findOnePost(
    @Args(
      'id'
    ) id:string): Promise<Post>
    {
      return this.postService.findOne(id)
    }
  
  @Query(() => [Post], { name: 'deleted_posts' })
  findDeletedPost() {
    return this.postService.findDeleted()
  }
}
