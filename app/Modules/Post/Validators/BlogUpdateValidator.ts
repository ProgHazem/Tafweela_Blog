import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class BlogUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([rules.minLength(20), rules.maxLength(100)]),
    body: schema.string([rules.minLength(20)]),
    cover: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
  })
  public messages: CustomMessages = {
    'title.required': this.ctx.i18n.formatMessage('post.validator.userName.required'),
    'title.minLength': this.ctx.i18n.formatMessage('post.validator.userName.required'),
    'title.maxLength': this.ctx.i18n.formatMessage('post.validator.userName.required'),
    'email.required': this.ctx.i18n.formatMessage('auth.validator.email.required'),
    'email.email': this.ctx.i18n.formatMessage('auth.validator.email.email'),
    'email.unique': this.ctx.i18n.formatMessage('auth.validator.email.unique'),
    'password.required': this.ctx.i18n.formatMessage('auth.validator.password.required'),
    'password.regex': this.ctx.i18n.formatMessage('auth.validator.password.regex'),
    'password.confirmed': this.ctx.i18n.formatMessage('auth.validator.password.confirmed'),
  }
}
