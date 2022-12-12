import { inject } from '@adonisjs/fold'
import PostRepository from 'App/Modules/Post/Repository/PostRepository'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { BodyBlog, BodyUpdateBlog } from 'App/Modules/Post/Types'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import { I18nContract } from '@ioc:Adonis/Addons/I18n'
// import ErrorException from 'App/Exceptions/ErrorException'
// import Database from '@ioc:Adonis/Lucid/Database'

@inject()
export default class PostService {
  constructor(private postRepository: PostRepository) {}
  public async getAllPosts() {
    try {
      const posts = await this.postRepository.getAll()
      console.log('posts', posts)
      return { posts }
    } catch (error) {
      throw error
    }
  }
  public async getOnePost(id: number, i18n: I18nContract) {
    try {
      const post = await this.postRepository.findOne(id)
      if (!post) {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.resource_Not_found'),
          400,
          i18n.formatMessage('exceptions.general.E_NOT_FOUND')
        )
      }
      return { post }
    } catch (error) {
      throw error
    }
  }
  public async createPost(bodyBlog: BodyBlog) {
    try {
      const post = await this.postRepository.create(bodyBlog)
      return { post }
    } catch (error) {
      throw error
    }
  }
  public async updatePost(id: number, bodyUpdateBlog: BodyUpdateBlog) {
    try {
      const post = await this.postRepository.update(id, { ...bodyUpdateBlog })
      return { post }
    } catch (error) {
      throw error
    }
  }
  public async deletePost(id: number) {
    try {
      const post = await this.postRepository.delete(id)
      return { post }
    } catch (error) {
      throw error
    }
  }
}
