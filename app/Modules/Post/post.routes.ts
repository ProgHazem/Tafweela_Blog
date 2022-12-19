import Route from '@ioc:Adonis/Core/Route'

Route.where('id', {
  match: /^[0-9]+/,
  cast: (id) => Number(id),
})

Route.group(() => {
  Route.get('/', 'PostController.getAllPosts')
  Route.get('/:id', 'PostController.getOnePost')
  Route.group(() => {
    Route.post('/', 'PostController.createPost')
    Route.put('/:id', 'PostController.updatePost')
    Route.delete('/:id', 'PostController.deletePost')
  }).middleware(['auth', 'role:admin,creator'])
})
  .namespace('App/Modules/Post/Http')
  .prefix('api/v1/posts')
