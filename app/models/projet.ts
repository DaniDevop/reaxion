import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Projet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projet: string

  @column()
  declare etat: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
