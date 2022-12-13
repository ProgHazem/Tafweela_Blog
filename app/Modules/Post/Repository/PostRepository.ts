import PostRepositoryContract from 'App/Modules/Post/Repository/Contracts/PostRepositoryContract'
import Post from 'App/Modules/Post/Model/Post'
import { inject } from '@adonisjs/fold'
import { BodyBlog } from 'App/Modules/Post/Types'

@inject()
export default class PostRepository implements PostRepositoryContract {
  private model = Post
  constructor() {}
  public async getAll(page: number, perPage: number): Promise<Post[] | null> {
    return await this.model.query().paginate(page, perPage)
  }
  public async findOne(id: number) {
    try {
      return await this.model.find(id)
    } catch (e) {
      throw e
    }
  }
  public async create(data: BodyBlog): Promise<Post> {
    return await this.model.create(data)
  }
  public async update(post: Post, data: any): Promise<Post | undefined> {
    if (post) {
      return await post.merge({ ...data }).save()
    }
  }
  public async delete(post: Post): Promise<any> {
    if (post) {
      return await post.delete()
    }
  }
}
