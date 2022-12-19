import { test } from '@japa/runner'
import User from 'App/Modules/Auth/Model/User'

test.group('Failed Creating Post Scenario', async () => {
  test('Not Authorized', async ({ client }) => {
    const response = await client.post('/api/v1/posts').form({})
    response.assertStatus(401)
    response.assertTextIncludes(
      '{"statusCode":401,"errors":"E_UNAUTHORIZED_ACCESS: Unauthorized access","errorType":"E_UNAUTHORIZED_ACCESS","path":"/api/v1/posts","status":false'
    )
  })
  test('Empty Body', async ({ client }) => {
    await User.updateOrCreate(
      { email: 'hazem-post@gmail.com' },
      {
        userName: 'Hazem',
        email: 'hazem-post@gmail.com',
        password: 'Hazem@123',
        roleId: 2,
      }
    )
    const loginResponse = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem-post@gmail.com', password: 'Hazem@123' })
    const response = await client
      .post('/api/v1/posts')
      .bearerToken(loginResponse?.body().data.token.token)
      .form({})
    response.assertStatus(422)
    response.assertTextIncludes('["Title Required","Body Required","Cover Required"]')
  })
  test('Empty Post Body', async ({ client }) => {
    await User.updateOrCreate(
      { email: 'hazem-post@gmail.com' },
      {
        userName: 'Hazem',
        email: 'hazem-post@gmail.com',
        password: 'Hazem@123',
        roleId: 2,
      }
    )

    const loginResponse = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem-post@gmail.com', password: 'Hazem@123' })
    const response = await client
      .post('/api/v1/posts')
      .bearerToken(loginResponse?.body()?.data?.token?.token)
      .form({
        title: 'Hello Article',
      })
    response.assertStatus(422)
    response.assertTextIncludes('["Body Required","Cover Required"]')
  })
  test('Empty Post Cover', async ({ client }) => {
    await User.updateOrCreate(
      { email: 'hazem-post@gmail.com' },
      {
        userName: 'Hazem',
        email: 'hazem-post@gmail.com',
        password: 'Hazem@123',
        roleId: 2,
      }
    )

    const loginResponse = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem-post@gmail.com', password: 'Hazem@123' })
    const response = await client
      .post('/api/v1/posts')
      .bearerToken(loginResponse?.body()?.data?.token?.token)
      .form({
        title: 'Hello Article',
        body: 'Hello Article',
      })
    response.assertStatus(422)
    response.assertTextIncludes('["Cover Required"]')
  })
})

test.group('Success Creating Post Scenario', async () => {
  test('Empty Post Cover', async ({ client }) => {
    await User.updateOrCreate(
      { email: 'hazem-post@gmail.com' },
      {
        userName: 'Hazem',
        email: 'hazem-post@gmail.com',
        password: 'Hazem@123',
        roleId: 2,
      }
    )

    const loginResponse = await client
      .post('/api/v1/auth/login')
      .form({ email: 'hazem-post@gmail.com', password: 'Hazem@123' })
    const response = await client
      .post('/api/v1/posts')
      .bearerToken(loginResponse?.body()?.data?.token?.token)
      .form({
        title: 'Hello Article',
        body: 'Hello Article',
        cover: {
          fieldName: 'cover',
          clientName: '(57).png',
          size: 77913,
          type: 'image',
          extname: 'png',
          subtype: 'png',
          state: 'consumed',
          isValid: true,
          validated: true,
          errors: [],
          meta: {},
        },
      })
    response.assertStatus(422)
    response.assertTextIncludes('["Cover Required"]')
  })
})
