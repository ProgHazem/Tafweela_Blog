import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorClass } from 'App/Modules/Sheard/Classes/error.class'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthenticatedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthenticatedException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response
      .status(error.status)
      .send(new ErrorClass(error.status, error.message, error.code, ctx.request.url()))
  }
}
