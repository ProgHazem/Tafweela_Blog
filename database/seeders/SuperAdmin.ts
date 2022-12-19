import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Modules/Auth/Model/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { email: 'super_admin@tafweela.com' },
      {
        userName: 'Super Admin',
        email: 'super_admin@tafweela.com',
        password: 'Admin@123',
        roleId: 1,
      }
    )
  }
}
