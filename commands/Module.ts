import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import * as fs from 'fs'
import { string } from '@ioc:Adonis/Core/Helpers'
export default class Module extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'module'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Make Module'

  public static settings = {
    loadApp: false,
    stayAlive: false,
  }

  @args.string({ description: 'Name of the Module Must be Capital' })
  public name: string

  public async run() {
    if (!fs.existsSync('./app/Modules')) {
      fs.mkdirSync('./app/Modules')
    }
    if (!fs.existsSync(`./app/Modules/${string.capitalCase(this.name)}`)) {
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}`)
      // controller
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Http`)
      fs.writeFileSync(
        `./app/Modules/${string.capitalCase(this.name)}/Http/${string.capitalCase(
          this.name
        )}Controller.ts`,
        `import { inject } from '@adonisjs/fold'
import ${string.capitalCase(this.name)}Service from 'App/Modules/${string.capitalCase(
          this.name
        )}/Services/${string.capitalCase(this.name)}Service'

@inject()
export default class ${string.capitalCase(this.name)}Controller {

  constructor(private ${string.snakeCase(this.name)}Service: ${string.capitalCase(
          this.name
        )}Service) {}
}`
      )
      // services
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Services`)
      fs.writeFileSync(
        `./app/Modules/${string.capitalCase(this.name)}/Services/${string.capitalCase(
          this.name
        )}Service.ts`,
        `import { inject } from '@adonisjs/fold'
import ${string.capitalCase(this.name)}Repository from 'App/Modules/${string.capitalCase(
          this.name
        )}/Repository/${string.capitalCase(this.name)}Repository'

@inject()
export default class ${string.capitalCase(this.name)}Service {

  constructor(private ${string.snakeCase(this.name)}Repository: ${string.capitalCase(
          this.name
        )}Repository) {}
}`
      )
      // Repository
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Repository`)
      fs.writeFileSync(
        `./app/Modules/${string.capitalCase(this.name)}/Repository/${string.capitalCase(
          this.name
        )}Repository.ts`,
        `import { inject } from '@adonisjs/fold'
import ${string.capitalCase(this.name)} from 'App/Modules/${string.capitalCase(
          this.name
        )}/Model/${string.capitalCase(this.name)}'

@inject()
export default class ${string.capitalCase(this.name)}Repository {
  private model = ${string.capitalCase(this.name)}
  constructor() {}
}`
      )
      // Contracts
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Repository/Contracts`)

      // Create Model
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Model`)
      fs.writeFileSync(
        `./app/Modules/${string.capitalCase(this.name)}/Model/${string.capitalCase(this.name)}.ts`,
        `import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class ${string.capitalCase(this.name)} extends BaseModel {
  @column({ isPrimary: true })
  public id: number
@column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}`
      )

      // Types
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Types`)
      fs.writeFileSync(`./app/Modules/${string.capitalCase(this.name)}/Types/index.ts`, '')
      // Validators
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Validators`)
      fs.writeFileSync(`./app/Modules/${string.capitalCase(this.name)}/Validators/index.ts`, '')
      //Testing
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Tests`)
      fs.mkdirSync(`./app/Modules/${string.capitalCase(this.name)}/Tests/Functional`)
      fs.writeFileSync(
        `./app/Modules/${string.capitalCase(this.name)}/Tests/Functional/${string.snakeCase(
          this.name
        )}.spec.ts`,
        `import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/')
  response.assertStatus(200)
})`
      )
    }
  }
}
