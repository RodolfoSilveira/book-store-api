'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotosSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments()
      table.string('path').notNullable()
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotosSchema
