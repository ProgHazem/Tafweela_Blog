import { inject } from '@adonisjs/fold'
import RoleService from 'App/Modules/Role/Services/RoleService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SuccessClass } from 'App/Modules/Sheard/Classes/success.class'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import ErrorException from 'App/Exceptions/ErrorException'
import { ErrorClass } from 'App/Modules/Sheard/Classes/error.class'
import { ValidationException } from '@adonisjs/validator/build/src/ValidationException'
import RoleValidator from 'App/Modules/Role/Validators/RoleValidator'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

@inject()
export default class RoleController {
  private errorValidation: string[] = []
  constructor(private roleService: RoleService) {}
  public async index({ request, response, i18n, params }: HttpContextContract) {
    try {
      const roles = await this.roleService.getAllRoles(params?.page, params?.perPage, i18n)
      return new SuccessClass(roles.data)
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
  public async show({ request, response, i18n, params }: HttpContextContract) {
    try {
      const role = await this.roleService.getOneRole(params.id, i18n)
      return new SuccessClass(role)
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
          .status(error.status)
          .send(
            new ErrorClass(
              error.status,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async store({ request, response, i18n }: HttpContextContract) {
    try {
      const payloads = await request.validate(RoleValidator)
      const role = await this.roleService.createRole(payloads)
      return new SuccessClass(role)
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
          .status(error.status)
          .send(
            new ErrorClass(
              error.status,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async update({ request, response, i18n, params }: HttpContextContract) {
    try {
      const payload = await request.validate(RoleValidator)
      const role = await this.roleService.updateRole(params.id, payload, i18n)
      return new SuccessClass(role)
    } catch (error) {
      if (
        error instanceof ResourceNotFoundException ||
        error instanceof ErrorException ||
        error instanceof UnAuthorizedException
      ) {
        return response
          .status(error.status)
          .send(new ErrorClass(error.status, error.message, error.code, request.url()))
      } else if (error instanceof ValidationException) {
        error?.messages?.errors?.filter((error: { message: string }) =>
          this.errorValidation.push(error.message)
        )
        return response
          .status(error.status)
          .send(
            new ErrorClass(
              error.status,
              this.errorValidation,
              i18n.formatMessage('exceptions.general.E_VALIDATION_ERROR'),
              request.url()
            )
          )
      }
    }
  }
  public async delete({ request, response, i18n, params }: HttpContextContract) {
    try {
      const role = await this.roleService.deleteRole(params.id, i18n)
      return new SuccessClass(role)
    } catch (error) {
      if (
        error instanceof ResourceNotFoundException ||
        error instanceof ErrorException ||
        error instanceof UnAuthorizedException
      ) {
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
