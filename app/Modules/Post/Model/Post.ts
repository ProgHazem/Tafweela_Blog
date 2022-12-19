import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Modules/Auth/Model/User'
import AppBaseModel from 'App/Models/AppBaseModel'
import Application from '@ioc:Adonis/Core/Application'

export default class Post extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public body: string

  @column({
    consume: (value) => Application.publicPath(`./uploads/posts/${value}`),
  })
  public cover: string

  @column()
  public userId: number

  @column.dateTime({
    serializeAs: null,
    consume: (value) => DateTime.fromJSDate(value).toLocaleString(),
  })
  public deletedAt?: DateTime | null

  @column.dateTime({
    autoCreate: true,
    consume: (value) => DateTime.fromJSDate(value).toLocaleString(),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    consume: (value) => DateTime.fromJSDate(value).toLocaleString(),
  })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
