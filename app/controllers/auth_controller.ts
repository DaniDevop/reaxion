import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { UserService } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import { UserData } from '../utils/utils.js'

import User from '#models/user'
@inject()
export default class AuthController {
  constructor(private userService: UserService) {}

  async login({ response, request }: HttpContext) {
    try {
      const { email, password } = request.body()

      const result = await this.userService.login(email, password)

      return response.status(result.code).json({ data: result })
    } catch (error) {
      return response.status(500).json({ data: error.message })
    }
  }

  async register({ request, response }: HttpContext) {
    try {
      const { email, nom, role, password } = request.body()
      const data: UserData = { email, nom, role, password }
      const result = await this.userService.createUser(data)

      return response.status(result.code).json({ message: result.response, data: result.data })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'ERRO :' + error })
    }
  }

  async findUserByNameOrEmail({ request, response }: HttpContext) {
    try {
      const { nameOrEmail } = request.body()
      const tachesAll = await this.userService.findTachesToUser(nameOrEmail)

      return response
        .status(tachesAll.code)
        .json({ message: tachesAll.response, data: tachesAll.data })
    } catch (error) {
      return response.status(500).json({ message: 'Error controller ' + error.message })
    }
  }
  async logout({ response, auth }: HttpContext) {
    try {
      const apiRemove = await auth.authenticate()


      const user = await this.userService.deniedSession(apiRemove.id)

      return response.status(200).json({ message: user })
    } catch (error) {
      return response.status(500).json({ message: 'Error controller ' + error.message })
    }
  }
}
