import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Tache from './tache.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Projet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projet: string

  @column()
  declare etat: string

  @column()
  declare taches: relations.HasMany<typeof Tache>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
