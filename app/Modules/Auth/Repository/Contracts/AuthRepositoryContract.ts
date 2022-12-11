import BodyRegister from 'App/Modules/Auth/Types/BodyRegister'
import User from 'App/Modules/Auth/Model/User'

interface AuthRepositoryContract {
  create(data: BodyRegister): Promise<User>
  findOne(email: string): Promise<User | null>
}

export default AuthRepositoryContract
