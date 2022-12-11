/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/auth.routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

import 'App/Modules/Auth/auth.routes'

Route.get('/', async () => {
  Application.logger.info(Application.nodeEnvironment!.toString())
  Application.logger.info(Application.version!.toString())
  Application.logger.info(Application.version!.major.toString())
  Application.logger.info(Application.version!.minor.toString())
  Application.logger.info(Application.version!.patch.toString())
  Application.logger.info(Application.adonisVersion!.toString())
  return { hello: 'world', env: Application.environment, dev: Application.inDev }
})
