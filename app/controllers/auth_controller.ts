import bcrypt from 'bcryptjs'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {





  
  async login({ auth, response, request }): HttpContext {
    try {
      const { email, password } = request.body()

      const user = await User.findBy('email', email)

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return response.status(401).json({ message: 'Informations introuvable' })
      }


      const token = await User.accessTokens.create(user)

      return response.status(200).json({ data: token, user: user })
    } catch (error) {
      return response.status(500).json({ data: error.message })
    }
  }

  async register({ request, response }: HttpContext) {
    try {
      const { email, nom, role, passwords } = request.body()

      const password = await bcrypt.hash(passwords, 10)

      const newUser = await User.create({
        nom,
        email,
        role,
        password,
      })


      return response.status(200).json({ r: token, user: newUser })
    } catch (error) {
      return response.status(402).json({ data: error.message })
    }
  }
}
