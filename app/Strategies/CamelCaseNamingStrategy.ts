import { string } from '@ioc:Adonis/Core/Helpers'
import { SnakeCaseNamingStrategy, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  // public columnName(_model: typeof BaseModel, propertyName: string): string {
  //   return string.camelCase(propertyName)
  // }
  public serializedName(_model: typeof BaseModel, attributeName: string): string {
    return string.camelCase(attributeName)
  }
  public paginationMetaKeys() {
    return {
      total: 'total',
      perPage: 'per_page',
      currentPage: 'current_page',
      lastPage: 'last_page',
      firstPage: 'first_page',
      firstPageUrl: 'first_page_url',
      lastPageUrl: 'last_page_url',
      nextPageUrl: 'next_page_url',
      previousPageUrl: 'previous_page_url',
    }
  }
}
