import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Tache from './tache.js'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare password: string
  @column()
  declare role: string
  @column()
  declare piece_identity: string

  @column()
  declare taches: relations.HasMany<typeof Tache>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  email: any
}
