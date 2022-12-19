import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'

export default class TinyUserResource extends BaseResource {
  public resource(row, _lang = 'en') {
    if (row) {
      return {
        userName: row.userName,
      }
    }
  }
}
