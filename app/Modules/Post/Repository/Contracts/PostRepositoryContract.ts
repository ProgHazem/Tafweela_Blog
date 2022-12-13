import Post from 'App/Modules/Post/Model/Post'
import { BodyBlog, BodyUpdateBlog } from 'App/Modules/Post/Types'

interface PostRepositoryContract {
  getAll(page: number, perPage: number): Promise<Post[] | null>
  findOne(id: number): Partial<Promise<Post | null>>
  create(data: BodyBlog): Promise<Post>
  update(post: Post, data: BodyUpdateBlog): Promise<Post | undefined>
  delete(post: Post): Promise<any>
}

export default PostRepositoryContract
