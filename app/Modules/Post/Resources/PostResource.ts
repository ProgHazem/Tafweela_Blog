import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'
import TinyUserResource from 'App/Modules/Auth/Resources/TinyUserResource'
export default class PostResource extends BaseResource {
  public resource(row, _lang = 'en') {
    if (row) {
      let data: any = {
        type: 'posts',
        id: Number(row.id),
        attributes: {
          title: row.title,
          body: row.body,
          cover: row.cover,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        },
        relationships: {
          user: new TinyUserResource().resource(row.$preloaded.user.$attributes, _lang),
        },
      }
      return data
    }
  }

  public collection(rows, lang) {
    console.log(rows)
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
