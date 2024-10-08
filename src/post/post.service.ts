import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { IsNull, Not, Repository } from 'typeorm'
import { User } from 'src/auth/entities/user.entity'
import { CreatePostDto } from './dto/create-post.input'

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>

  ){}

/**
 * The function creates a new post using the provided data and the user who created it.
 * @param {CreatePostDto} createPostDto - The `createPostDto` parameter is likely an object that
 * contains the data needed to create a new post. It may include properties such as the post title,
 * content, tags, or any other relevant information for the post. This data is used to create a new
 * post entity in the database.
 * @param {User} user - The `user` parameter in the `create` function represents the user who is
 * creating the post. It is of type `User`, which likely contains information about the user such as
 * their username, email, and other relevant details. This parameter is used to associate the post
 * being created with the user who
 * @returns The `create` method is returning a Promise that resolves to a `Post` object after saving
 * the post created with the provided `createPostDto` and `user` information.
 */
  async create( createPostDto:CreatePostDto,user:User,imageUrl:string):Promise<Post> {

    const post = this.postRepository.create({
      ...createPostDto,
      image: imageUrl,
      createdBy:user,
    })
    return this.postRepository.save(post)
  }


/**
 * The `findAll` function asynchronously retrieves all posts with their associated createdBy relation.
 * @returns An array of Post objects with the createdBy relation populated.
 */
  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['createdBy'],
    });
  }


/**
 * The function `findOne` retrieves a post by its ID and throws a NotFoundException if the post is not
 * found.
 * @param {string} id - The `findOne` method takes an `id` parameter of type string, which is used to
 * find and return a single `Post` object from the database based on the provided `id`. If no post is
 * found with the given `id`, a `NotFoundException` is thrown with the message "Post
 * @returns The `findOne` method is returning a `Promise` that resolves to a `Post` object.
 */
  async findOne(id:string): Promise<Post>{
    const post = await this.postRepository.findOneBy({id})
    if (!post) throw new NotFoundException(`Post no encontrado`)
    return post 
  }

/**
 * The function `delete` deletes a post by its ID and returns a success message if the post is deleted.
 * @param {string} id - The `id` parameter in the `delete` method is a string that represents the
 * identifier of the post that needs to be deleted.
 * @returns The `delete` method returns a Promise that resolves to a string. If the deletion operation
 * is successful, it returns the message "post eliminado". If the deletion operation does not affect
 * any rows (result.affected === 0), it throws a NotFoundException with the message "No encontrado".
 */
  async delete(id:string): Promise<string> {
    const result = await this.postRepository.softDelete(id)
    if(result.affected === 0) throw new NotFoundException(`No encontrado`)
    return `post eliminado`
  }

/**
 * The function removes a post by its ID and returns a success message if the post is removed.
 * @param {string} id - The `id` parameter in the `remove` method is a string that represents the
 * identifier of the post that needs to be removed from the database.
 * @returns The `remove` method returns a Promise that resolves to a string. The string returned is
 * either "Post removido" if the deletion was successful, or it throws a NotFoundException with the
 * message "No encontrado" if the deletion was not successful (i.e., no post with the specified ID was
 * found to delete).
 */
  async remove(id:string): Promise<string> {
    const result = await this.postRepository.delete(id)
    if(result.affected === 0) throw new NotFoundException(`No encontrado`)
      return `Post removido`
  }

/**
 * The `restore` function restores a deleted post by setting its `deleted_at` property to null and
 * saving it.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * post that needs to be restored.
 * @returns The `restore` method is returning a Promise that resolves to a `Post` object after
 * restoring a deleted post.
 */
  async restore(id:string): Promise<Post> {
    const post = await this.postRepository.findOne({where: {id}, withDeleted: true})
    if(!post) throw new NotFoundException(`Post no encontrado`)
    post.deleted_at = null
    return this.postRepository.save(post)
  }

/**
 * This function asynchronously retrieves all posts that have been marked as deleted.
 * @returns An array of Post objects that have been deleted.
 */
  async findDeleted(): Promise<Post[]>{
    return this.postRepository.query('SELECT * FROM post WHERE deleted_at IS NOT NULL')
  }


  async getPostCreator(postId: string): Promise<User> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['createdBy'],
    });
  
    if (!post) {
      throw new Error('Post not found');
    }
  
    return post.createdBy;
  }
  
}
