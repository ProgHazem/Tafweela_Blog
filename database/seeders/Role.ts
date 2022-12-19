import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Modules/Role/Model/Role'

export default class extends BaseSeeder {
  private Roles = [
    {
      nameEn: 'Admin',
      nameAr: 'مدير',
    },
    {
      nameEn: 'Creator',
      nameAr: 'كاتب',
    },
    {
      nameEn: 'User',
      nameAr: 'مستخدم',
    },
  ]
  public async run() {
    await Role.updateOrCreateMany('nameEn', this.Roles)
  }
}
