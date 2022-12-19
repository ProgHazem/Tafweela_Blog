import { inject } from '@adonisjs/fold'
import RoleRepository from 'App/Modules/Role/Repository/RoleRepository'
import { I18nContract } from '@ioc:Adonis/Addons/I18n'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import BodyRole from 'App/Modules/Role/Types/BodyRole'
import RoleResource from 'App/Modules/Role/Resources/RoleResource'
@inject()
export default class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  public async getAllRoles(page = 1, perPage = 25, i18n: I18nContract) {
    try {
      const roles = await this.roleRepository.getAll(page, perPage)
      return new RoleResource().collection(roles, i18n.locale)
    } catch (error) {
      throw error
    }
  }
  public async getOneRole(id: number, i18n: I18nContract) {
    try {
      const role = await this.roleRepository.findOne(id)
      if (!role) {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.resource_Not_found'),
          400,
          i18n.formatMessage('exceptions.general.E_NOT_FOUND')
        )
      }
      return new RoleResource().resource(role, i18n.locale)
    } catch (error) {
      throw error
    }
  }
  public async createRole(bodyRole: BodyRole) {
    try {
      const role = await this.roleRepository.create(bodyRole)
      return { role }
    } catch (error) {
      throw error
    }
  }
  public async updateRole(id: number, bodyRole: BodyRole, i18n: I18nContract) {
    try {
      const role = await this.roleRepository.findOne(id)
      if (role) {
        const updatedRole = await this.roleRepository.update(role, bodyRole)
        return { post: updatedRole }
      } else {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND'),
          400,
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND')
        )
      }
    } catch (error) {
      throw error
    }
  }
  public async deleteRole(id: number, i18n: I18nContract) {
    try {
      const role = await this.roleRepository.findOne(id)
      if (role) {
        const deletedRole = await this.roleRepository.delete(role)
        return { role: deletedRole }
      } else {
        throw new ResourceNotFoundException(
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND'),
          400,
          i18n.formatMessage('exceptions.general.E_ROW_NOT_FOUND')
        )
      }
    } catch (error) {
      throw error
    }
  }
}
