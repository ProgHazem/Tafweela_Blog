import { DateTime } from 'luxon'
import { column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
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
    serialize: (value) => Application.publicPath(`./uploads/posts/${value}`),
  })
  public cover: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
