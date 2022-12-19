import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'

export default class TinyRoleResource extends BaseResource {
  public resource(row, lang = 'en') {
    if (row) {
      if (lang === 'en') {
        return {
          name: row.nameEn,
        }
      }
      return {
        name: row.nameAr,
      }
    }
  }
}
