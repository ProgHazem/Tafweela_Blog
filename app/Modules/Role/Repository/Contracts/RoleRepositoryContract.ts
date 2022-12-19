import Role from 'App/Modules/Role/Model/Role'
import BodyRole from 'App/Modules/Role/Types/BodyRole'

interface RoleRepositoryContract {
  getAll(page: number, perPage: number): Promise<Role[] | null>
  findOne(id: number): Promise<Role | null>
  create(data: BodyRole): Promise<Role>
  update(post: Role, data: BodyRole): Promise<Role | undefined>
  delete(post: Role): Promise<any>
}

export default RoleRepositoryContract
