import { test } from '@japa/runner'
import HttpStatusCodeEnum from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Failed Create Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Not Authorized admin', async ({ client }) => {
    const response = await client.post('/api/v1/roles').form({})
    response.assertStatus(HttpStatusCodeEnum.UNAUTHORIZED)
    response.assertTextIncludes('"E_UNAUTHORIZED_ACCESS: Unauthorized access"')
  })
  test('Create Role With empty data', async ({ client }) => {
    const responseCreateRole = await client
      .post('/api/v1/roles')
      .headers({
        Authorization: LoginToken,
      })
      .form({})
    responseCreateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseCreateRole.assertTextIncludes(
      '"errors":["Role English Name Required","Role Arabic Name Required"]'
    )
  })
  test('Create Role With empty data', async ({ client }) => {
    const responseCreateRole = await client
      .post('/api/v1/roles')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role',
      })
    responseCreateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseCreateRole.assertTextIncludes('"errors":["Role Arabic Name Required"]')
  })
  test('Create Role With Error Validation', async ({ client }) => {
    const responseCreateRole = await client
      .post('/api/v1/roles')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role %3',
        nameAr: 'hfbhbfh',
      })
    responseCreateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseCreateRole.assertTextIncludes(
      '"errors":["Role English Name Must be English Character","Role Arabic Name Must be Arabic Character"]'
    )
  })
})

test.group('Success Create Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Create Role', async ({ client }) => {
    const responseCreateRole = await client
      .post('/api/v1/roles')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role',
        nameAr: 'تيست رول',
      })
    responseCreateRole.assertStatus(HttpStatusCodeEnum.OK)
    responseCreateRole.assertTextIncludes('{"data":{"role":{"name_en":')
  })
})
