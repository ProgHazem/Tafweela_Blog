import AuthRepositoryContract from 'App/Modules/Auth/Repository/Contracts/AuthRepositoryContract'
import User from 'App/Modules/Auth/Model/User'
import BodyRegister from 'App/Modules/Auth/Types/BodyRegister'
import { inject } from '@adonisjs/fold'

@inject()
export default class AuthRepository implements AuthRepositoryContract {
  private model = User
  constructor() {}
  public async create(data: BodyRegister): Promise<User> {
    return await this.model.create(data)
  }
  public async findOne(email): Promise<User | null> {
    return await this.model.findBy('email', email)
  }
}
