import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'taches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('taches')
      table.string('etat')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('projet_id').unsigned().references('id').inTable('projets')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
