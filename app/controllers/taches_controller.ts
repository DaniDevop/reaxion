import Tache from '#models/tache'
import type { HttpContext } from '@adonisjs/core/http'

export default class TachesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const tachesAll = await Tache.all()
    return response.status(200).json({ data: tachesAll })
  }

  /**
   * Display form to create a new record
   */

  async store({ request, response }: HttpContext) {



    try {
      const taches = new Tache();
      taches.user_id = request.input( 'user_id')
      taches.projet_id = request.input('projet_id')
      taches.taches = request.input('taches')
      taches.etat = request.input('etat')
      await taches.save()
      return response.status(200).json({ message: 'Taches crée avec succes', data: taches })
    } catch (error) {
      return response.status(400).json({ message: 'Erreur taches non crée' })

    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request }: HttpContext) {
    try {
      const taches = await Tache.find(request.input('id'))
      if (!taches) {
        return response.status(400).json({ message: 'Taches introuvable ' })
      }
      taches.user_id = request.input('user_id')
      taches.projet_id = request.input('projet_id')
      taches.taches = request.input('taches')
      taches.etat = request.input('etat')
      await taches.save()
      return response.status(200).json({ message: 'Taches update avec succes', data: taches })
    } catch (error) {
      return response.status(400).json({ message: 'Erreur taches non crée' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ response, request }: HttpContext) {
    try {
      const taches = await Tache.find(request.param('id'))
      if (!taches) {
        return response.status(400).json({ message: 'Taches introuvable'})
      }
      await taches.delete()
      return response.status(200).json({ message: 'Taches delete avec succes', data: taches })
    } catch (error) {
      return response.status(400).json({ message: 'Erreur taches non crée' })
    }
  }
}
