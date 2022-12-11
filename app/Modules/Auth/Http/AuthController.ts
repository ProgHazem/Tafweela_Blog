import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Modules/Auth/Services/AuthService'
import { SuccessClass } from 'App/Modules/Sheard/Classes/success.class'
import {
  LoginValidator,
  RegisterValidator,
  RefreshTokenValidator,
} from 'App/Modules/Auth/Validators'
import { inject } from '@adonisjs/fold'
import { ErrorClass } from 'App/Modules/Sheard/Classes/error.class'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import ErrorException from 'App/Exceptions/ErrorException'
import { ValidationException } from '@adonisjs/validator/build/src/ValidationException'
@inject()
export default class AuthController {
  private errorValidation: string[] = []
  constructor(private authService: AuthService) {}
  public async register({ request, auth, response, i18n }: HttpContextContract): Promise<any> {
    try {
      const payload = await request.validate(RegisterValidator)
      const result = await this.authService.register(payload, auth)
      return new SuccessClass(result)
    } catch (error) {
      if (error instanceof ValidationException) {
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
  public async login({ request, auth, response, i18n }: HttpContextContract): Promise<any> {
    try {
      const payload = await request.validate(LoginValidator)
      const result = await this.authService.login(payload, auth, i18n)
      return new SuccessClass(result)
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
  public async refreshToken({ request, auth, response, i18n }: HttpContextContract): Promise<any> {
    try {
      const payload = await request.validate(RefreshTokenValidator)
      const result = await this.authService.refreshToken(payload, auth, i18n)
      return new SuccessClass(result)
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
  public async logout({ request, auth, response, i18n }: HttpContextContract): Promise<any> {
    try {
      const result = await this.authService.logout(auth, i18n)
      return new SuccessClass(result)
    } catch (error) {
      if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(400)
          .send(
            new ErrorClass(
              400,
              this.errorValidation,
              i18n.formatMessage('exceptions.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
}
