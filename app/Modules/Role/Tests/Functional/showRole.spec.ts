import { test } from '@japa/runner'

test('Show Role', async ({ client }) => {
  const response = await client.get('/api/v1/roles/1')
  response.assertStatus(200)
  response.assertTextIncludes('{"data":{"type":"roles"')
})
