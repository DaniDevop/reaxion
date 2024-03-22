import Projet from '#models/projet'
import ProjetService from '#services/projet_.service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { ProjetData } from '../utils/utils.js'

@inject()
export default class ProjetsController {
  /**
   * Display a list of resource
   */

  constructor(private ProjetService: ProjetService) {}

  async index({ response }: HttpContext) {
    try {
      const result = await this.ProjetService.getAllProjet()
      return response.status(result.code).json({ data: result.data })
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const { projet, etat } = request.body()
      const projets: ProjetData = { projet, etat }
      const result = await this.ProjetService.createTaches(projets)

      return response
        .status(result.code)
        .json({ message: 'Projet crée avec succes', data: result.data })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    try {
      const result = await this.ProjetService.findProjetById(request.input('id'))

      return response.status(result.code).json({ data: result.data })
    } catch (error) {
      return response.status(404).json({ error: 'Projet not found' })
    }
  }

  async update({ response, request }: HttpContext) {
    try {
      const { projet, etat } = request.body()
      const projets: ProjetData = { projet, etat }
      const result = await this.ProjetService.udateProjet(projets, request.input('id'))

      return response
        .status(result.code)
        .json({ message: 'Projet crée avec succes', data: result.data })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }
}
