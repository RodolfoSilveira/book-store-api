'use strict'

const Book = use('App/Models/Book')
const Photo = use('App/Models/Photo')
const Helpers = use('Helpers')

class PhotoController {
  async store ({ request, params }) {
    const book = await Book.findOrFail(params.id)

    const images = request.file('path', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => {
      return {
        name: `${new Date().getTime()}-${file.clientName}`
      }
    })

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => book.photos().create({ path: image.fileName }))
    )
  }

  async show ({ params }) {
    const photo = await Photo.findOrFail(params.path)

    return photo
  }
}

module.exports = PhotoController
