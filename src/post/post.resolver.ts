import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'
import { validRoles } from 'src/auth/interface'
import { CreatePostDto } from './dto/create-post.input'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { S3Service } from '../s3/s3.service'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => Post)
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly s3Service: S3Service,
  ) {}

  /**
   * This async function returns a Promise that resolves to an array of Post objects fetched from the
   * postService.
   * @returns An array of `Post` objects is being returned asynchronously as a Promise.
   */
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  // @Query(() => [Post], { name: 'posts' })
  // findAll() {
  //   return this.postService.findAll();
  // }

/**
 * This TypeScript function creates a post with optional image upload functionality and returns a
 * Promise of the created post.
 * @param {CreatePostDto} createPostDto - The `createPostDto` parameter is an object that contains
 * the data needed to create a new post. It likely includes properties such as title, content, and
 * any other relevant information for the post. This parameter is passed to the `createPost` function
 * when a new post is being created.
 * @param {User} user - The `user` parameter in the `createPost` function represents the user who is
 * creating the post. It is of type `User` and is obtained using the `@GetUser()` decorator. This
 * parameter allows you to identify the user who is making the post and associate the post with their
 * account
 * @param {FileUpload} image - The `image` parameter in the `createPost` function is of type
 * `FileUpload`, which is used to handle file uploads in GraphQL. When a user uploads an image, the
 * `image` parameter will contain information about the uploaded file, such as the `createReadStream`
 * function to access the
 * @returns The `createPost` function is returning a Promise that resolves to a `Post` object. The
 * function first checks if an image file is provided, validates the file type, uploads the file to
 * an S3 bucket using the `s3Service`, and then calls the `create` method of the `postService` to
 * create a new post with the provided data (createPostDto, user,
 */
  @Mutation(() => Post)
  @Auth()
  async createPost(
    @Args('createPostInput') createPostDto: CreatePostDto,
    @GetUser() user: User,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable:true })
    image: FileUpload,
  ): Promise<Post> {

    let imageUrl: string | undefined

    if(image){
      const {createReadStream, filename,mimetype} = image

      if(!['image/jpeg','images.png'].includes(mimetype)){
        throw new Error('Image type doesnt supported')
      }

      const fileStream = createReadStream();
      const fileKey = `${Date.now()}-${filename}`

      imageUrl = await this.s3Service.uploadFile(fileKey, fileStream, mimetype)
    }

    return this.postService.create(createPostDto,user,imageUrl);
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

  @ResolveField(() => User, { nullable: true })
  async createdBy(@Parent() post: Post, @Context() context): Promise<User | null> {
    const requestingUser: User = context.req.user;
  
    // Aseguramos que el creador del post esté cargado
    if (!post.createdBy) {
      post.createdBy = await this.postService.getPostCreator(post.id);
    }
  
    // Si el usuario es ADMIN, siempre muestra el creador
    if (requestingUser && requestingUser.roles && requestingUser.roles.includes('admin')) {
      return post.createdBy;
    }
  
    // Si el usuario es el creador del post, mostrar el creador
    if (requestingUser && requestingUser.id === post.createdBy.id) {
      return post.createdBy;
    }
  
    // Si el post es anónimo, no mostrar el creador
    if (post.anonPost) {
      return null;
    }
  
    // Para posts no anónimos, mostrar el creador
    return post.createdBy;
  }
  
  
}