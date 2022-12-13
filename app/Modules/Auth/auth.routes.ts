import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register').as('register')
  Route.post('login', 'AuthController.login').as('login')
  Route.put('refresh-token', 'AuthController.refreshToken').as('refreshToken')
})
  .prefix('/api/v1/auth')
  .namespace('App/Modules/Auth/Http')

Route.group(() => {
  Route.delete('logout', 'AuthController.logout').as('logout')
})
  .prefix('/api/v1/auth')
  .middleware('auth')
  .namespace('App/Modules/Auth/Http')
