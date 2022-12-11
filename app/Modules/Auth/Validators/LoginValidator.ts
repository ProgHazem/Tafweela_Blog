import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  })
  public messages: CustomMessages = {
    'email.required': this.ctx.i18n.formatMessage('auth.validator.email.required'),
    'email.email': this.ctx.i18n.formatMessage('auth.validator.email.email'),
    'password.required': this.ctx.i18n.formatMessage('auth.validator.password.required'),
    'password.regex': this.ctx.i18n.formatMessage('auth.validator.password.regex'),
  }
}
