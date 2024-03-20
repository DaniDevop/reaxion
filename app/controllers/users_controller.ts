import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import bcrypt from 'bcryptjs'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const usersAll = await User.all()
    return response.status(200).json({ data: usersAll })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const newUser = new User()
      newUser.nom = request.input('nom')
      newUser.email = request.input('email')
      newUser.role = request.input('role')
      newUser.password = await bcrypt.hash(request.input('password'), 10)
      await newUser.save()
      return response.status(200).json({ message: 'Users crée avec', data: new User() })
    } catch (error) {
      return response.status(500).json({ data: 'message' })
    }
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    try {
      const user = await User.find(request.param('id'));
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }
      return response.status(200).json({ data: user });
    } catch (error) {
      console.error('Error in UsersController show:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request }: HttpContext) {
    try {
      const user = await User.find(request.input('id'))
      if (!user) {
        return response.status(404).json({ message: 'Le user est inexistant' })
    }
      user.nom = request.input('nom')
      user.email = request.input('email')
      user.role = request.input('role')
      user.password = await bcrypt.hash(request.input('password'), 10)
      await user.save()
      return response.status(200).json({ message: 'Users mise à jour avec succes', data: user })
    } catch (error) {
      return response.status(500).json({ message: 'Une erreur est survenue' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
