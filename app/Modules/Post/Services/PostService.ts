import { inject } from '@adonisjs/fold'
import PostRepository from 'App/Modules/Post/Repository/PostRepository'
import { BodyBlog, BodyUpdateBlog } from 'App/Modules/Post/Types'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import { I18nContract } from '@ioc:Adonis/Addons/I18n'
import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Modules/Auth/Model/User'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import PostResource from 'App/Modules/Post/Resources/PostResource'

@inject()
export default class PostService {
  constructor(private postRepository: PostRepository) {}
  public async getAllPosts(page = 1, perPage = 25, i18n: I18nContract) {
    try {
      const posts = await this.postRepository.getAll(page, perPage)
      return new PostResource().collection(posts, i18n.locale)
    } catch (error) {
      console.log(error)
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
      return new PostResource().resource(post, i18n.locale)
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
  public async updatePost(
    id: number,
    bodyUpdateBlog: BodyUpdateBlog,
    bouncer: ActionsAuthorizerContract<User>,
    i18n: I18nContract
  ) {
    try {
      const post = await this.postRepository.findOne(id)
      if (post) {
        if (await bouncer.denies('updatePost', post)) {
          throw new UnAuthorizedException(
            i18n.formatMessage('exceptions.general.E_UNAUTHORIZED'),
            403,
            i18n.formatMessage('exceptions.general.E_UNAUTHORIZED')
          )
        }
        const updatedPost = await this.postRepository.update(post, bodyUpdateBlog)
        return { post: updatedPost }
      }
    } catch (error) {
      throw error
    }
  }
  public async deletePost(
    id: number,
    bouncer: ActionsAuthorizerContract<User>,
    i18n: I18nContract
  ) {
    try {
      const post = await this.postRepository.findOne(id)
      if (post) {
        if (await bouncer.denies('updatePost', post)) {
          throw new UnAuthorizedException(
            i18n.formatMessage('exceptions.general.E_UNAUTHORIZED'),
            403,
            i18n.formatMessage('exceptions.general.E_UNAUTHORIZED')
          )
        }
        const deletedPost = await this.postRepository.delete(post)
        return { post: deletedPost }
      } else {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND'),
          400,
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND')
        )
      }
    } catch (error) {
      throw error
    }
  }
}
