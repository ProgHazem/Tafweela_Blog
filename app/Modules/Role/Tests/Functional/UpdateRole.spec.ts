import { test } from '@japa/runner'
import HttpStatusCodeEnum from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Failed Update Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Not Authorized admin', async ({ client }) => {
    const response = await client.put('/api/v1/roles/3').form({})
    response.assertStatus(HttpStatusCodeEnum.UNAUTHORIZED)
    response.assertTextIncludes('"E_UNAUTHORIZED_ACCESS: Unauthorized access"')
  })
  test('Update Role With empty data', async ({ client }) => {
    const responseUpdateRole = await client
      .put('/api/v1/roles/3')
      .headers({
        Authorization: LoginToken,
      })
      .form({})
    responseUpdateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseUpdateRole.assertTextIncludes(
      '"errors":["Role English Name Required","Role Arabic Name Required"]'
    )
  })
  test('Update Role With empty data', async ({ client }) => {
    const responseUpdateRole = await client
      .put('/api/v1/roles/3')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role',
      })
    responseUpdateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseUpdateRole.assertTextIncludes('"errors":["Role Arabic Name Required"]')
  })
  test('Update Role With Error Validation', async ({ client }) => {
    const responseUpdateRole = await client
      .put('/api/v1/roles/3')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role %3',
        nameAr: 'hfbhbfh',
      })
    responseUpdateRole.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
    responseUpdateRole.assertTextIncludes(
      '"errors":["Role English Name Must be English Character","Role Arabic Name Must be Arabic Character"]'
    )
  })
  test('Update Role Not Found', async ({ client }) => {
    const responseUpdateRole = await client
      .put('/api/v1/roles/10')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role',
        nameAr: 'تيست رول',
      })
    responseUpdateRole.assertStatus(HttpStatusCodeEnum.BAD_REQUEST)
    responseUpdateRole.assertTextIncludes(
      '"E_ROW_NOT_FOUND: E_ROW_NOT_FOUND","errorType":"E_ROW_NOT_FOUND"'
    )
  })
})

test.group('Success Update Role', async (group) => {
  let LoginToken
  group.each.setup(async ({ context }) => {
    const { response } = await context.client
      .post('/api/v1/auth/login')
      .form({ email: 'super_admin@tafweela.com', password: 'Admin@123' })
    LoginToken = `${response.body?.data?.token.type} ${response.body?.data?.token?.accessToken}`
  })
  test('Update Role', async ({ client }) => {
    const responseUpdateRole = await client
      .put('/api/v1/roles/2')
      .headers({
        Authorization: LoginToken,
      })
      .form({
        nameEn: 'Test Role',
        nameAr: 'تيست رول',
      })
    responseUpdateRole.assertStatus(HttpStatusCodeEnum.OK)
    responseUpdateRole.assertTextIncludes(
      '{"data":{"post":{"id":2,"name_en":"Test Role","name_ar":"تيست رول",'
    )
  })
})
