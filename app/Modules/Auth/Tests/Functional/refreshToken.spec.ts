import { test } from '@japa/runner'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Auth Refresh Token Failure Scenario', () => {
  test('Empty Body', async ({ client }) => {
    const response = await client.put('/api/v1/auth/refresh-token').form({})
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Refresh Token Required"')
  })

  test('Invalid Refresh token', async ({ client }) => {
    const response = await client.put('/api/v1/auth/refresh-token').form({
      refreshToken: 'jjnvkjkjjng',
    })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"E_NOT_FOUND: Invalid Refresh Token"')
  })
})

test.group('Auth Refresh Token Success Scenario', () => {
  test('Success Register', async ({ client }) => {
    const { response } = await client.post('/api/v1/auth/register').form({
      userName: 'Ali',
      email: 'zoma@gmail.com',
      password: 'Zoma@1234',
      passwordConfirmation: 'Zoma@1234',
    })
    const responseRefreshToken = await client.put('/api/v1/auth/refresh-token').form({
      refreshToken: response?.body?.data?.token?.refreshToken,
    })
    responseRefreshToken.assertStatus(HttpStatusCode.OK)
    responseRefreshToken.assertTextIncludes('{"data":{"token":')
  })
})
