import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Modules/Post/Model/Post'
import AppBaseModel from 'App/Models/AppBaseModel'

export default class User extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'userName' })
  public userName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(auth: User) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
}
