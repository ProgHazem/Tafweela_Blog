import { test } from '@japa/runner'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Auth Register Failure Scenario', () => {
  test('Empty Body', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').form({})
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Email Required","Password Required"')
  })

  test('Empty userName', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').form({ email: 'ali@gmail.com' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"UserName Required"')
  })
  test('Empty Password', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({ userName: 'Ali', email: 'ali@gmail.com' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Password Required"')
  })

  test('Invalid Email', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({ userName: 'Ali', email: 'ali@g', password: 'Ali@1234' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Email is invalid"')
  })

  test('Email Already Register', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').form({
      userName: 'Ali',
      email: 'hazem@gmail.com',
      password: 'Hazem@123',
      passwordConfirmation: 'Hazem@123',
    })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('"Email is Already register"')
  })

  test('Invalid Password', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({ userName: 'Ali', email: 'ali@gmail.com', password: 'Hazem' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes(
      '"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"'
    )
  })

  test('Password Must be confirmed', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({ userName: 'Ali', email: 'ali@gmail.com', password: 'Ali@1234' })
    response.assertStatus(HttpStatusCode.UNPROCESSABLE_ENTITY)
    response.assertTextIncludes('confirmed validation failed on passwordConfirmation')
  })
})

test.group('Auth Register Success Scenario', () => {
  test('Success Register', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').form({
      userName: 'Ali',
      email: 'ali@gmail.com',
      password: 'Ali@1234',
      passwordConfirmation: 'Ali@1234',
    })
    response.assertStatus(HttpStatusCode.OK)
    response.assertTextIncludes('{"data":{"user":')
  })
})
