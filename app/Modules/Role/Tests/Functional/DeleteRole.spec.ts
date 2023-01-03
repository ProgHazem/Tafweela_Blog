import { test } from '@japa/runner'
import HttpStatusCodeEnum from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Failed Delete Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Not Authorized admin', async ({ client }) => {
    const response = await client.delete('/api/v1/roles/3')
    response.assertStatus(HttpStatusCodeEnum.UNAUTHORIZED)
    response.assertTextIncludes('"E_UNAUTHORIZED_ACCESS: Unauthorized access"')
  })
  test('Delete Role Not Found', async ({ client }) => {
    const responseDeleteRole = await client.delete('/api/v1/roles/10').headers({
      Authorization: LoginToken,
    })
    responseDeleteRole.assertStatus(HttpStatusCodeEnum.BAD_REQUEST)
    responseDeleteRole.assertTextIncludes(
      '"E_ROW_NOT_FOUND: E_ROW_NOT_FOUND","errorType":"E_ROW_NOT_FOUND"'
    )
  })
})

test.group('Success Delete Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Delete Role', async ({ client }) => {
    const responseDeleteRole = await client.delete('/api/v1/roles/3').headers({
      Authorization: LoginToken,
    })
    responseDeleteRole.assertStatus(HttpStatusCodeEnum.OK)
    responseDeleteRole.assertTextIncludes('{"data":{},')
  })
})
