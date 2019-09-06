'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')
const Mail = use('Mail')

class AuthController {
  async login ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async register ({ request, auth }) {
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

    const user = await User.create({
      username,
      email,
      password,
      avatar: images.fileName
    })

    const token = await auth.generate(user)

    return { user, token }
  }

  async forgotPassword ({ request }) {
    const { email } = request.only(['email'])

    await Mail.send('emails.welcome', { email }, (message) => {
      message
        .to(email)
        .from('book@contato.com')
        .subject('Welcome to yardstick')
    })
  }
}

module.exports = AuthController
