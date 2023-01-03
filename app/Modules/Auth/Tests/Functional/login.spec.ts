import { test } from '@japa/runner'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Auth Login Failure Scenario', () => {
  test('Empty Body', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({})
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Email Required","Password Required"')
  })

  test('Empty Password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({ email: 'hazem@gmail.com' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Password Required"')
  })

  test('Invalid Email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({ email: 'hazem@g' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Email is invalid"')
  })

  test('Invalid Password', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes(
      '"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"'
    )
  })

  test('Email Not Found', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'Ali@gmail.com', password: 'Hazem@1234' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"E_NOT_FOUND: Resource Not Found"')
  })

  test('Invalid Credentials', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem@1234' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('Credentials Invalid')
  })
})

test.group('Auth Login Success Scenario', () => {
  test('Success Login', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem@123' })
    response.assertStatus(HttpStatusCode.OK)
    response.assertTextIncludes('{"data":{"type":"users"')
  })
})
