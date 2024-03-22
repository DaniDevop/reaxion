import bcrypt from 'bcryptjs'
import User from '#models/user'
import { createPostValidator } from '../utils/validators.js'

export class UserService {
  async getAllUser() {
    try {
      const users = await User.all()
      return { data: users, response: 'Success', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 500 }
    }
  }

  async createUser({ nom, password, email, role }) {
    try {
      const data = { nom, password, email, role }
      const valiData = createPostValidator(data)
      if (!valiData.valid) {
        return { error: valiData.error, response: 'Error', code: 400 }
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({
        nom: nom,
        password: hashedPassword,
        email: email,
        role: role,
      })

      return { data: 'User Created', response: 'Success', code: 200 }
    } catch (console) {
      return { response: 'Data invalide ', code: 500 }
    }
  }
}
export default UserService
