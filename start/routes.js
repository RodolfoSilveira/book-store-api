'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
Route.post('/forgot', 'AuthController.forgotPassword')

Route.group(() => {
  Route.get('/user', 'UserController.index')
  Route.get('/user/:id', 'UserController.show')
  Route.delete('/user/:id', 'UserController.destroy')
  Route.post('/user/:id', 'UserController.update')

  Route.resource('books', 'BookController').apiOnly()
  Route.post('books/:id/images', 'PhotoController.store')
  Route.get('images/:path', 'PhotoController.show')
}).middleware('auth')
