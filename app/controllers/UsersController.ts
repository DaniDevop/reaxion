/* eslint-disable unicorn/filename-case */

import type { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { UserData } from '../utils/utils.js'

@inject()
export default class UsersController {
  /**
   * Display a list of resource
   *
   *
   */
  constructor(private userSservice: UserService) {}

  async index({ response }: HttpContext) {
    try {
      const result = await this.userSservice.getAllUser()

      return response.status(result.code).json({ data: result.data })
    } catch (error) {
      return response.status(200).json({ error: error })
    }
  }

  /**
   * Handle form submission for the create action
   */

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    try {
      const user = await this.userSservice.findUserById(request.param('id'))

      return response.status(user.code).json({ data: user })
    } catch (error) {
      console.error('Error in UsersController show:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request }: HttpContext) {
    try {
      const { taches, etat, user_id, projet_id } = request.body()
      const user: UserData = { taches, etat, user_id, projet_id }
      const result = await this.userSservice.updateUser(user, request.param('id'))

      return response
        .status(result.code)
        .json({ message: 'Users mise à jour avec succes', data: user })
    } catch (error) {
      return response.status(500).json({ message: 'Une erreur est survenue' })
    }
  }
  /**
   * Upload Image
   */
  async uploadFile({ request, response }: HttpContext) {
    try {
      const result = await this.userSservice.uploaFile(request.file('piece'), request.input('id'))

      return response.status(result.code).json({ message: result.response })
    } catch (error) {
      return response.status(500).json({ message: 'Une erreur est survenue' })
    }
  }
}
