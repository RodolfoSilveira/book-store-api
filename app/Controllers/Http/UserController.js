'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')

class UserController {
  async index ({ response }) {
    const users = await User.all()

    return response.send(users)
  }

  async show ({ request }) {
    const { id } = request.params
    const user = await User.findOrFail(id)

    return user
  }

  async update ({ request }) {
    const { id } = request.params
    const user = await User.findOrFail(id)
    const { username, email, password } = request.all()

    const images = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    await images.move(Helpers.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${images.clientName}`
    })

    if (!images.moved()) {
      return images.errors()
    }

    user.merge({
      username,
      email,
      password,
      avatar: images.fileName
    })

    await user.save()

    return user
  }

  async destroy ({ request }) {
    const { id } = request.params
    const user = await User.find(id)
    await user.delete()
  }
}

module.exports = UserController
