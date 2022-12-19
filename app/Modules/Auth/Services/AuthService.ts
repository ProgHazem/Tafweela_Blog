import AuthRepository from 'App/Modules/Auth/Repository/AuthRepository'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { I18nContract } from '@ioc:Adonis/Addons/I18n'
import { BodyLogin, BodyRefreshToken, BodyRegister } from 'App/Modules/Auth/Types'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import Hash from '@ioc:Adonis/Core/Hash'
import ErrorException from 'App/Exceptions/ErrorException'
import { inject } from '@adonisjs/fold'
import Database from '@ioc:Adonis/Lucid/Database'
import HttpStatusCode from 'App/Modules/Sheard/Enums/http-status-code.enum'
import UserResource from 'App/Modules/Auth/Resources/UserResource'
@inject()
export default class AuthService {
  constructor(private authRepository: AuthRepository) {}
  public async register(bodyRegister: BodyRegister, auth: AuthContract) {
    try {
      const user = await this.authRepository.create(bodyRegister)
      const token = await auth.use('jwt').generate(user)
      return new UserResource().resource(user, token)
    } catch (error) {
      throw error
    }
  }
  public async login(bodyLogin: BodyLogin, auth: AuthContract, i18n: I18nContract) {
    try {
      const user = await this.authRepository.findOne(bodyLogin.email)
      if (!user) {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.resource_Not_found'),
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          i18n.formatMessage('exceptions.general.E_NOT_FOUND')
        )
      }
      if (!(await Hash.verify(user.password, bodyLogin.password))) {
        throw new ErrorException(
          i18n.formatMessage('exceptions.general.Credentials_Invalid'),
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          i18n.formatMessage('exceptions.general.E_INVALID_DATA')
        )
      }
      const token = await auth.use('jwt').generate(user)
      return new UserResource().resource(user, token, i18n.locale)
    } catch (error) {
      throw error
    }
  }
  public async refreshToken(
    bodyRefreshToken: BodyRefreshToken,
    auth: AuthContract,
    i18n: I18nContract
  ) {
    try {
      const existRefreshToken = await Database.query()
        .from('jwt_tokens')
        .where('refresh_token', '=', bodyRefreshToken.refreshToken)
        .first()
      if (!existRefreshToken) {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.Invalid_Refresh_Token'),
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          i18n.formatMessage('exceptions.general.E_NOT_FOUND')
        )
      }
      const token = await auth.use('jwt').loginViaRefreshToken(bodyRefreshToken.refreshToken)
      return { token }
    } catch (error) {
      throw error
    }
  }
  public async logout(auth: AuthContract, i18n: I18nContract) {
    try {
      await auth.use('jwt').logout()
      return { message: i18n.formatMessage('auth.general.Logout_Success') }
    } catch (error) {
      throw error
    }
  }
}
