'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  photos () {
    return this.hasMany('App/Models/Photo')
  }
}

module.exports = Book
