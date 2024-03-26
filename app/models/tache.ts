import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Projet from './projet.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
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

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Projet)
  declare projet: BelongsTo<typeof Projet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
