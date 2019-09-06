'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const Model = use('Model')

class Photo extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ path }) {
    return `${Env.get('APP_URL')}/images/${path}`
  }

  book () {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = Photo
