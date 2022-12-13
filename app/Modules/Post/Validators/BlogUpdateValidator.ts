import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class BlogUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([rules.minLength(10), rules.maxLength(100)]),
    body: schema.string([rules.minLength(10)]),
    cover: schema.file.optional({ size: '2mb', extnames: ['jpg', 'png'] }),
  })
  public messages: CustomMessages = {
    'title.required': this.ctx.i18n.formatMessage('post.validator.title.required'),
    'title.minLength': this.ctx.i18n.formatMessage('post.validator.title.minLength'),
    'title.maxLength': this.ctx.i18n.formatMessage('post.validator.title.minLength'),
    'body.required': this.ctx.i18n.formatMessage('post.validator.body.required'),
    'body.minLength': this.ctx.i18n.formatMessage('post.validator.userName.minLength'),
    'cover.required': this.ctx.i18n.formatMessage('post.validator.cover.required'),
    'cover.size': this.ctx.i18n.formatMessage('post.validator.cover.size'),
    'cover.extname': this.ctx.i18n.formatMessage('post.validator.cover.extname'),
  }
}
