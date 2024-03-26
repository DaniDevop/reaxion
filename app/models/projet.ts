import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Tache from './tache.js'

import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Projet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projet: string

  @column()
  declare etat: string

  @hasMany(() => Tache)
  declare taches: HasMany<typeof Tache>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
