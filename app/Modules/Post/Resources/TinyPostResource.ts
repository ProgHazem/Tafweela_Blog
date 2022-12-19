import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'

export default class TinyPostResource extends BaseResource {
  public resource(row, _lang = 'en') {
    if (row) {
      return {
        name: row.name,
      }
    }
  }
}
