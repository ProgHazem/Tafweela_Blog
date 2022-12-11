import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.put('refresh-token', 'AuthController.refreshToken')
})
  .prefix('/api/v1/auth')
  .namespace('App/Modules/Auth/Http')

Route.group(() => {
  Route.delete('logout', 'AuthController.logout')
})
  .prefix('/api/v1/auth')
  .middleware('auth')
  .namespace('App/Modules/Auth/Http')
