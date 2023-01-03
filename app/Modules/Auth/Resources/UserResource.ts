import BaseResource from 'App/Modules/Sheard/Resources/BaseResource'
import { DateTime } from 'luxon'
import TinyRoleResource from 'App/Modules/Role/Resources/TinyRoleResource'
export default class UserResource extends BaseResource {
  public resource(row, token, lang = 'en') {
    if (row) {
      let data: any = {
        type: 'users',
        id: Number(row.id),
        attributes: {
          userName: row.userName,
          email: row.email,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        },
        relationships: {
          role: new TinyRoleResource().resource(row.$preloaded.role?.$attributes, lang),
        },
      }
      if (token !== null) {
        let tokenShape: any = {}
        tokenShape.type = token.type
        tokenShape.accessToken = token.accessToken
        tokenShape.refreshToken = token.refreshToken
        tokenShape.expiresAt = DateTime.fromISO(token.expires_at).toLocaleString()
        data.token = tokenShape
      }
      return data
    }
  }
}
