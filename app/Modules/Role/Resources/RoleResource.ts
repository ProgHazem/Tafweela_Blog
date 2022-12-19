import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'
export default class RoleResource extends BaseResource {
  public resource(row, _lang = 'en') {
    if (row) {
      let data: any = {
        type: 'roles',
        id: Number(row.id),
        attributes: {
          name: _lang === 'en' ? row.nameEn : row.nameAr,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        },
      }
      return data
    }
  }

  public collection(rows, lang) {
    let output: { meta?: any; data: any[] } = { data: [] }
    let records = rows.toJSON()
    if (records.hasOwnProperty('meta')) {
      output.meta = rows.toJSON().meta
    }
    for (let i = 0; i < records.data.length; i++) {
      output['data'].push(this.resource(records.data[i], lang))
    }
    return output
  }
}
