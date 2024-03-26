import Tache from '#models/tache'
import { TachesData } from '../utils/utils.js'
import db from '@adonisjs/lucid/services/db'
export class TachesServices {
  async createTaches(tachesData: TachesData) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { taches, etat, user_id, projet_id } = tachesData
      const currentTaches = await Tache.create({
        taches,
        etat,
        user_id,
        projet_id,
      })
      return { data: currentTaches, response: 'Taches crée avec success 🎉', code: 201 }
    } catch (error) {
      return { response: 'Error : ' + error, code: 405 }
    }
  }

  async getAllTaches() {
    try {
      const query = await db
        .from('taches')
        .join('users', 'users.id', '=', 'taches.user_id')
        .join('projets', 'projets.id', '=', 'taches.projet_id')
        .orderBy('taches.id', 'desc')
      return { data: query, response: 'Ok ', code: 200 }
    } catch (error) {
      return { data: error.message, response: 'Error', code: 400 }
    }
  }

  async findTachesById(id: number) {
    try {
      const taches = await Tache.find(id)
      return { data: taches, response: 'Success', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 500 }
    }
  }

  async udateTaches(tachesData: TachesData, idTaches: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { taches, etat, user_id, projet_id } = tachesData
      const tachesExiste = await Tache.find(idTaches)
      if (!tachesExiste) {
        return { response: 'Error :  Taches non trouvé', code: 405 }
      }

      tachesExiste.taches = taches
      tachesExiste.etat = etat
      tachesExiste.user_id = user_id
      tachesExiste.projet_id = projet_id
      await tachesExiste.save()
      return { data: tachesExiste, response: 'Taches mise à jour  avec success', code: 201 }
    } catch (error) {
      return { response: 'Error : ' + error, code: 405 }
    }
  }
  async deleleTachesById(id: number) {
    try {
      const taches = await Tache.find(id)
      if (!taches) {
        return { response: 'Error :  Taches non trouvé', code: 405 }
      }
      taches.delete()
      return { data: taches, response: 'Success', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 500 }
    }
  }
}
export default TachesServices
