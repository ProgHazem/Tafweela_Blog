import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

import 'App/Modules/Auth/auth.routes'
import 'App/Modules/Post/post.routes'
import 'App/Modules/Role/role.routes'

Route.get('/', async () => {
  Application.logger.info(Application.nodeEnvironment!.toString())
  Application.logger.info(Application.version!.toString())
  Application.logger.info(Application.version!.major.toString())
  Application.logger.info(Application.version!.minor.toString())
  Application.logger.info(Application.version!.patch.toString())
  Application.logger.info(Application.adonisVersion!.toString())
  return { hello: 'world', env: Application.environment, dev: Application.inDev }
})
