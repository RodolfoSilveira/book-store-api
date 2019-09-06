'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('book_name').notNullable()
      table.string('author_name').notNullable()
      table.float('price').notNullable()
      table.text('description').notNullable()
      table.string('publishing_company').nullable()
      table.string('language').notNullable()
      table.string('pages').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BooksSchema
