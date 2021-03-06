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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('customers', 'CustomerController.index')
Route.get('customers/:id', 'CustomerController.show').middleware(['findCustomer'])
Route.post('customers', 'CustomerController.store')
Route.patch('customers/:id', 'CustomerController.update').middleware(['findCustomer'])
Route.delete('customers/:id', 'CustomerController.delete').middleware(['findCustomer'])

Route.get('projects', 'ProjectController.index')
Route.get('projects/:id', 'ProjectController.show')
Route.post('projects', 'ProjectController.store')
Route.patch('projects/:id', 'ProjectController.update')
Route.delete('projects/:id', 'ProjectController.delete')

Route.get('tasks', 'TaskController.index')
Route.get('tasks/:id', 'TaskController.show')
Route.post('tasks', 'TaskController.store')
Route.patch('tasks/:id', 'TaskController.update')
Route.delete('tasks/:id', 'TaskController.delete')
