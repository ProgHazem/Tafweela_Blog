import { test } from '@japa/runner'
import User from 'App/Modules/Auth/Model/User'

test.group('Auth Login Failure Scenario', () => {
  test('Empty Body', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({})
    response.assertStatus(400)
    response.assertTextIncludes('"Email Required","Password Required"')
  })

  test('Empty Password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({ email: 'hazem@gmail.com' })
    response.assertStatus(400)
    response.assertTextIncludes('"Password Required"')
  })

  test('Invalid Email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').form({ email: 'hazem@g' })
    response.assertStatus(400)
    response.assertTextIncludes('"Email Must be valid"')
  })

  test('Invalid Password', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem' })
    response.assertStatus(400)
    response.assertTextIncludes(
      '"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"'
    )
  })

  test('Email Not Found', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'Ali@gmail.com', password: 'Hazem@1234' })
    response.assertStatus(400)
    response.assertTextIncludes('"E_NOT_FOUND: Resource Not Found"')
  })

  test('Invalid Credentials', async ({ client }) => {
    await User.create({ userName: 'Hazem', email: 'hazem@gmail.com', password: 'Hazem@123' })
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem@1234' })
    response.assertStatus(400)
    response.assertTextIncludes('Credentials Invalid')
  })
})

test.group('Auth Login Success Scenario', () => {
  test('Success Login', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem@gmail.com', password: 'Hazem@123' })
    response.assertStatus(200)
    response.assertTextIncludes('{"data":{"user":')
  })
})
