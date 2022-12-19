import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'
import RoleModel from 'App/Modules/Role/Model/Role'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Role {
  public async handle(
    { auth, i18n }: HttpContextContract,
    next: () => Promise<void>,
    guards: string[]
  ) {
    if (auth.isLoggedIn) {
      const RoleNameEn = await RoleModel.find(auth?.user?.roleId)
      if (!guards.includes(string.snakeCase(String(RoleNameEn?.nameEn)))) {
        throw new UnAuthorizedException(
          i18n.formatMessage('exceptions.general.E_UNAUTHORIZED'),
          HttpStatusCode.FORBIDDEN,
          i18n.formatMessage('exceptions.general.E_UNAUTHORIZED')
        )
      }
    }
    await next()
  }
}
