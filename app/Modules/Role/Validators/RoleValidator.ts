import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nameEn: schema.string([rules.regex(/^[a-zA-z_ -]+$/)]),
    nameAr: schema.string([rules.regex(/^[\u0621-\u064A\u0660-\u0669 ]+$/)]),
  })

  public messages: CustomMessages = {
    'nameEn.required': this.ctx.i18n.formatMessage('Role.validator.nameEn.required'),
    'nameEn.regex': this.ctx.i18n.formatMessage('Role.validator.nameEn.regex'),
    'nameAr.required': this.ctx.i18n.formatMessage('Role.validator.nameAr.required'),
    'nameAr.regex': this.ctx.i18n.formatMessage('Role.validator.nameAr.regex'),
  }
}
