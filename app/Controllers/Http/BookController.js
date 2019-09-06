'use strict'

const Book = use('App/Models/Book')

class BookController {
  async index () {
    const books = Book.query()
      .with('photos')
      .fetch()

    return books
  }

  async store ({ request, auth }) {
    const { id } = auth.user
    const data = request.only([
      'book_name',
      'author_name',
      'price',
      'description',
      'publishing_company',
      'language',
      'pages'
    ])

    const book = await Book.create({ ...data, user_id: id })

    return book
  }

  async show ({ params }) {
    const book = await Book.findOrFail(params.id)

    await book.load('photos')

    return book
  }

  async update ({ params, request }) {
    const book = await Book.findOrFail(params.id)

    const data = request.only([
      'book_name',
      'author_name',
      'price',
      'description',
      'publishing_company',
      'language',
      'pages'
    ])

    book.merge(data)

    await book.save()

    return book
  }

  async destroy ({ params, auth, response }) {
    const book = await Book.findOrFail(params.id)

    if (book.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await book.delete()
  }
}

module.exports = BookController
