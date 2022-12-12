import { inject } from '@adonisjs/fold'
import PostService from 'App/Modules/Post/Services/PostService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BlogUpdateValidator, BlogValidator } from 'App/Modules/Post/Validators'
import { SuccessClass } from 'App/Modules/Sheard/Classes/success.class'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import ErrorException from 'App/Exceptions/ErrorException'
import { ErrorClass } from 'App/Modules/Sheard/Classes/error.class'
import { ValidationException } from '@adonisjs/validator/build/src/ValidationException'
import Application from '@ioc:Adonis/Core/Application'

@inject()
export default class PostController {
  private errorValidation: string[] = []

  constructor(private postService: PostService) {}

  public async getAllPosts({ request, i18n, response }: HttpContextContract) {
    try {
      const posts = await this.postService.getAllPosts()
      return new SuccessClass(posts)
    } catch (error) {
      if (error instanceof ResourceNotFoundException || error instanceof ErrorException) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async getOnePost({ params, request, i18n, response }: HttpContextContract) {
    try {
      const post = await this.postService.getOnePost(params.id, i18n)
      return new SuccessClass(post)
    } catch (error) {
      if (error instanceof ResourceNotFoundException || error instanceof ErrorException) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async createPost({ request, i18n, response, auth }: HttpContextContract) {
    try {
      const payloads = await request.validate(BlogValidator)
      await payloads.cover.moveToDisk('./posts')
      const post = await this.postService.createPost({
        ...payloads,
        cover: payloads.cover.fileName,
        user_id: auth?.user?.id,
      })
      return new SuccessClass(post)
    } catch (error) {
      if (error instanceof ResourceNotFoundException || error instanceof ErrorException) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async updatePost({ params, request, i18n, response, auth }: HttpContextContract) {
    try {
      const payloads = await request.validate(BlogUpdateValidator)
      const post = await this.postService.updatePost(params.id, payloads)
      return new SuccessClass(post)
    } catch (error) {
      if (error instanceof ResourceNotFoundException || error instanceof ErrorException) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async deletePost({ params, request, i18n, response }: HttpContextContract) {
    try {
      const post = await this.postService.deletePost(params.id)
      return new SuccessClass(post)
    } catch (error) {
      if (error instanceof ResourceNotFoundException || error instanceof ErrorException) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
}
