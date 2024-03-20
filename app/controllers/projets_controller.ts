import Projet from '#models/projet'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjetsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {

    const ProjetAll = await Projet.all()
    return response.status(200).json({ data: ProjetAll })
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
      const projet = new Projet()
      projet.projet = request.input('projet')
      projet.etat = request.input('etat')
      await projet.save()
      return response.status(200).json({ message: 'Projet crée avec succes', data: projet })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    try {
      const projet = await Projet.find(request.param('id'))

      if (!projet) {
        return response.status(404).json({ error: 'Projet not found' })
      }

      return response.status(200).json({ data: projet })
    } catch (error) {
      return response.status(404).json({ error: 'Projet not found' })
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
      const projet = await Projet.find(request.input('id'))
      projet.projet = request.input('projet')
      projet.etat = request.input('etat')
      await projet.save();
      return response.status(200).json({ message: 'Projet modifiée avec succes', data: projet })
    } catch (error) {
      return response.status(500).json({ message: 'Une erreur est survenue dans le code' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {

    
   }
}
