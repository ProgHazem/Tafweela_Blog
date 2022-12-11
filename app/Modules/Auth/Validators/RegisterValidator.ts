import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userName: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([
      rules.confirmed('passwordConfirmation'),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  })
  public messages: CustomMessages = {
    'userName.required': this.ctx.i18n.formatMessage('auth.validator.userName.required'),
    'email.required': this.ctx.i18n.formatMessage('auth.validator.email.required'),
    'email.email': this.ctx.i18n.formatMessage('auth.validator.email.email'),
    'email.unique': this.ctx.i18n.formatMessage('auth.validator.email.unique'),
    'password.required': this.ctx.i18n.formatMessage('auth.validator.password.required'),
    'password.regex': this.ctx.i18n.formatMessage('auth.validator.password.regex'),
    'password.confirmed': this.ctx.i18n.formatMessage('auth.validator.password.confirmed'),
  }
}
