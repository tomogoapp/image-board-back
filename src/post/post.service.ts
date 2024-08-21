import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { IsNull, Not, Repository } from 'typeorm'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

/**
 * The function creates a new post with the given title and content and saves it using a repository.
 * @param {string} title - The `title` parameter is a string that represents the title of a post.
 * @param {string} content - The `content` parameter in the `create` function represents the content of
 * the post that will be created. It is a string type parameter where you can provide the text or body
 * of the post that you want to save in the database.
 * @returns The `create` method is returning a Promise that resolves to a `Post` object after saving
 * the post with the provided title and content in the post repository.
 */
  async create( title:string,content:string,user:User ):Promise<Post> {

    const post = this.postRepository.create({
      title,
      content,
      createdBy:user
    })
    return this.postRepository.save(post)
  }

/**
 * The `findAll` function asynchronously retrieves all posts from the post repository and returns them
 * as an array of `Post` objects.
 * @returns An array of `Post` objects is being returned.
 */
  async findAll(): Promise<Post[]> {
    return this.postRepository.find()
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

}
