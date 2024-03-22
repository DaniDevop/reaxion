import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Projet from './projet.js'
export default class Tache extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare taches: string

  @column()
  declare etat: string

  @column()
  declare user_id: number

  @column()
  declare projet_id: number

  @column()
  declare user: relations.BelongsTo<typeof User>

  @column()
  declare projet: relations.BelongsTo<typeof Projet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
