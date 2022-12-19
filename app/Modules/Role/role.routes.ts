import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'RoleController.index').as('index')
    Route.get('/:id', 'RoleController.show').as('show')
  })
  Route.group(() => {
    Route.post('/', 'RoleController.store').as('store')
    Route.put('/:id', 'RoleController.update').as('update')
    Route.delete('/:id', 'RoleController.delete').as('delete')
  }).middleware(['auth', 'role:admin'])
})
  .prefix('/api/v1/roles')
  .namespace('App/Modules/Role/Http')
  .as('roles')
