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

/**
 * This function deletes a post based on the provided ID.
 * @param {string} id - The `id` parameter in the `deletePost` function is a string type argument that
 * represents the identifier of the post that needs to be deleted. This function is part of a service
 * that interacts with posts and calls the `delete` method from the `postService` to delete the post
 * with the
 * @returns A Promise<string> is being returned.
 */
  @Mutation(() => String)
  deletePost(
    @Args(
      'id'
    ) id: string
  ): Promise<String> {
    return this.postService.delete(id)
  }
  
/**
 * This function removes a post based on the provided ID.
 * @param {string} id - The `id` parameter in the `removePost` function is a string type. It is used to
 * identify the post that needs to be removed from the post service.
 * @returns The `removePost` method is returning a Promise that resolves to a string. The string is the
 * result of calling the `remove` method on the `postService` with the `id` parameter passed to the
 * `removePost` method.
 */
  @Mutation(() => String)
  removePost(
    @Args(
      'id'
    ) id: string
  ): Promise<String> {
    return this.postService.remove(id)
  }

/**
 * This function restores a post by its ID using the post service.
 * @param {string} id - The `restorePost` function takes a single parameter `id` of type string. This
 * function is used to restore a post by calling the `restore` method from the `postService` with the
 * provided `id`.
 * @returns A Promise<Post> is being returned.
 */
  @Mutation(() => Post)
  restorePost(
    @Args(
      'id'
    ) id:string
  ): Promise<Post> {
    return this.postService.restore(id)
  }

/**
 * This function finds and returns a single post based on the provided ID.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a post.
 * It is used to retrieve a specific post from the database by passing it to the `findOne` method of
 * the `postService`.
 * @returns A Promise that resolves to a Post object is being returned.
 */
  @Query(() => Post)
  findOnePost(
    @Args(
      'id'
    ) id:string
  ): Promise<Post> {
    return this.postService.findOne(id)
  }
  
  @Query(() => [Post], { name: 'deleted_posts' })
  findDeletedPost() {
    return this.postService.findDeleted()
  }
}
