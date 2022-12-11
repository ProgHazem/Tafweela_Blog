import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class RefreshTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    refreshToken: schema.string(),
  })
  public messages: CustomMessages = {
    'refreshToken.required': this.ctx.i18n.formatMessage('auth.validator.refreshToken.required'),
  }
}
