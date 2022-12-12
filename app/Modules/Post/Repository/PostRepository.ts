import PostRepositoryContract from 'App/Modules/Post/Repository/Contracts/PostRepositoryContract'
import Post from 'App/Modules/Post/Model/Post'
import { inject } from '@adonisjs/fold'
import { BodyBlog, BodyUpdateBlog } from 'App/Modules/Post/Types'

@inject()
export default class PostRepository implements PostRepositoryContract {
  private model = Post
  constructor() {}
  public async getAll(): Promise<Post[] | null> {
    return await this.model.all()
  }
  public async findOne(id: number) {
    return await this.model.find(id)
  }
  public async create(data: BodyBlog): Promise<Post> {
    return await this.model.create(data)
  }
  public async update(id: number, data: BodyUpdateBlog): Promise<Post | undefined> {
    const post = await this.findOne(id)
    if (post) {
      return await post.merge({ ...data }).save()
    }
  }
  public async delete(id: number): Promise<any> {
    const post = await this.findOne(id)
    if (post) {
      return await post.delete()
    }
  }
}
