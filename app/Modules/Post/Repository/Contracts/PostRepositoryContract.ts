import Post from 'App/Modules/Post/Model/Post'
import { BodyBlog, BodyUpdateBlog } from 'App/Modules/Post/Types'

interface PostRepositoryContract {
  getAll(): Promise<Post[] | null>
  findOne(id: number): Promise<Post | null>
  create(data: BodyBlog): Promise<Post>
  update(id: number, data: BodyUpdateBlog): Promise<Post | undefined>
  delete(id: number): Promise<any>
}

export default PostRepositoryContract
