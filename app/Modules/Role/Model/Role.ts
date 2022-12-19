import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from 'App/Modules/Auth/Model/User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nameEn: string

  @column()
  public nameAr: string

  @column.dateTime({
    serializeAs: null,
    consume: (value) => DateTime.fromJSDate(value).toLocaleString(),
  })
  public deletedAt: DateTime

  @column.dateTime({
    autoCreate: true,
    consume: (value) => {
      return DateTime.fromJSDate(value).toLocaleString()
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    consume: (value) => DateTime.fromJSDate(value).toLocaleString(),
  })
  public updatedAt: DateTime

  @hasMany(() => User)
  public users: HasMany<typeof User>
}
