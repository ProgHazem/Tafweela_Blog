import { test } from '@japa/runner'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'

test.group('Auth Refresh Token Failure Scenario', () => {
  test('Empty Header', async ({ client }) => {
    const response = await client.delete('/api/v1/auth/logout')
    response.assertStatus(HttpStatusCode.UNAUTHORIZED)
    response.assertTextIncludes('"E_UNAUTHORIZED_ACCESS: Unauthorized access"')
  })

  test('Invalid Error token', async ({ client }) => {
    const response = await client.delete('/api/v1/auth/logout').headers({
      Authorization: `bearer eyJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7InVzZXJJZCI6OCwidXNlciI6eyJlbWFpbCI6ImhhemVtQGdtYWlsLmNvbSJ9fSwiaWF0IjoxNjcwNDY3Nzc0LCJleHAiOjE2NzA0NjgzNzR9.e7zCQjcjmCKhM9kVUTrL1JTVQ1tLl1ZSjeGSYwzcdwKf0KJNHOiQenE2rQ1RO-1u2yZ1FlKGk3O7hjwl0WbC8Z-5uLifo9UAAZhzgpJpDo7_70-DVLi2SygZ34ie5PsERFExx-H4u3BQM3pg7t6UyJq6sEMgud48bPIyzzpM4Z0SQnaFN2OzSrUx0nIi1d2bFqMsYRcUwMY4mgoQSbo5Q-zPWKSKipBJLjJeGXrc2BRQ-g9FLxi3GiqpMS62jFXk7MgYPeGnmKbWeic_qKUG5PuJQe4Jj6tDbnTCBI9p35ehN_guU79zYHnDOxNhk284MZPaZfQlSANyfU9tr458kM9p7V98Z0GBRB0rIa0wpAxBNQdXcBUEA6Tuiqz5mn76p20v75UiBjC3c5BhQn-JMP5jMJxnd2_Pia8Qprc6ltiHELqevJKeO9t4aSjbMD_EoN6z_QqIwDB3C2u6U_AG8easJy00BzZH3JPBcbjbtva3DR-2ZNzNh0W-CF3Dm5deb-LUbhYFUC6YKGlRdhGcXdvuNzQf-VvzXenP14YUMsMVKKoZQhhSuTdGVXia_iQw8durM4H1qyeWiH1kYs47ahaShAi0GrFwPcq-eDFbI9WtNc9fx0gBzQK8NcRdqvMIv9BnVzcpxV68nKEvPoT_smH67Gaa2D5ZWYEkApAl_K4`,
    })
    response.assertStatus(HttpStatusCode.UNAUTHORIZED)
    response.assertTextIncludes('"E_UNAUTHORIZED_ACCESS: Unauthorized access"')
  })
})

test.group('Auth Logout Success Scenario', () => {
  test('Success Register', async ({ client }) => {
    const { response } = await client.post('/api/v1/auth/register').form({
      userName: 'Abdo',
      email: 'Abdo@gmail.com',
      password: 'Abdo@1234',
      passwordConfirmation: 'Abdo@1234',
    })
    const responseRefreshToken = await client.delete('/api/v1/auth/logout').headers({
      Authorization: `${response?.body?.data?.token?.type} ${response?.body?.data?.token?.token}`,
    })
    responseRefreshToken.assertStatus(HttpStatusCode.OK)
    responseRefreshToken.assertTextIncludes('Logout successfully')
  })
})
