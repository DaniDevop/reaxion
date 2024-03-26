import Projet from '#models/projet'
import Tache from '#models/tache'
import { ProjetData } from '../utils/utils.js'
import db from '@adonisjs/lucid/services/db'
export class ProjetService {
  async createTaches(tachesData: ProjetData) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { projet, etat } = tachesData
      const currentProjet = Projet.create({
        projet,
        etat,
      })
      return { data: currentProjet, response: 'Projet crée avec success', code: 201 }
    } catch (error) {
      return { response: 'Error : ' + error, code: 405 }
    }
  }

  async getAllProjet() {
    try {
      const projet = await Projet.query().join('taches', 'taches.projet_id', 'projets.id')
      const projetJson: Projet[] = []
      projet.forEach((projets) => {
        projetJson.push(projets)
      })
      return { data: projet, response: 'Ok ', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 400 }
    }
  }

  async findProjetById(id: number) {
    try {
      const projet = await Projet.find(id)
      return { data: projet, response: 'Success', code: 200 }
    } catch (error) {
      return { error: error.message, response: 'Error', code: 500 }
    }
  }

  async udateProjet(tachesData: ProjetData, idProjet: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { projet, etat } = tachesData
      const projetExiste = await Tache.find(idProjet)
      if (!projetExiste) {
        return { response: 'Error :  Projet non trouvé', code: 405 }
      }

      projet.taches = projet
      projet.etat = etat

      await projet.save()
      return { data: projet, response: 'Projet mise à jour  avec success', code: 201 }
    } catch (error) {
      return { response: 'Error : ' + error, code: 405 }
    }
  }
}
export default ProjetService
