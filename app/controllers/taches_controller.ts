import Tache from '#models/tache'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TachesData } from '../utils/utils.js'
import TachesServices from '#services/taches.services'

@inject()
export default class TachesController {
  /**
   * Display a list of resource
   */


  constructor(private tachesService: TachesServices) {}
  async index({ response }: HttpContext) {
    try {
      const datas = await this.tachesService.getAllTaches()
      return response.status(datas.code).json({ data: datas.response })
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  /**
   * Display form to create a new record
   */

  async store({ request, response }: HttpContext) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { taches, etat, user_id, projet_id } = request.body()
      const tachesSave: TachesData = { taches, etat, user_id, projet_id }
      const result = await this.tachesService.createTaches(tachesSave)

      return response.status(result.code).json({ message: result.response, data: result.data })
    } catch (error) {
      return response.status(400).json({ message: 'Erreur taches non crée' })
    }
  }


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
        return response.status(400).json({ message: 'Taches introuvable' })
      }
      await taches.delete()
      return response.status(200).json({ message: 'Taches delete avec succes', data: taches })
    } catch (error) {
      return response.status(400).json({ message: 'Erreur taches non crée' })
    }
  }
}
