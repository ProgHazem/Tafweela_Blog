import { test } from '@japa/runner'

test('Show All Role', async ({ client }) => {
  const response = await client.get('/api/v1/roles?page=1&perPage=50')
  response.assertStatus(200)
  response.assertTextIncludes('{"data":[{"type":"roles"')
})
