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
    await User.updateOrCreate(
      { email: 'hazem@gmail.com' },
      { userName: 'Hazem', email: 'hazem@gmail.com', password: 'Hazem@123', roleId: 2 }
    )
    await User.updateOrCreate(
      { email: 'Abdo@gmail.com' },
      { userName: 'Abdo', email: 'Abdo@gmail.com', password: 'Abdo@123', roleId: 2 }
    )
  }
}
