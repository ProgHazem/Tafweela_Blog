import { inject } from '@adonisjs/fold'
import Role from 'App/Modules/Role/Model/Role'
import RoleRepositoryContract from 'App/Modules/Role/Repository/Contracts/RoleRepositoryContract'
import BodyRole from 'App/Modules/Role/Types/BodyRole'

@inject()
export default class RoleRepository implements RoleRepositoryContract {
  private model = Role
  constructor() {}

  public async getAll(page: number, perPage: number): Promise<Role[] | null> {
    return await this.model.query().paginate(page, perPage)
  }

  public async findOne(id: number): Promise<Role | null> {
    return await this.model.find(id)
  }
  public async create(data: BodyRole): Promise<Role> {
    return await this.model.create(data)
  }

  public async update(role: Role, data: BodyRole): Promise<Role | undefined> {
    if (role) {
      return await role.merge({ ...data }).save()
    }
  }
  public async delete(role: Role): Promise<any> {
    if (role) {
      return await role.delete()
    }
  }
}
