/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import UsersController from '#controllers/users_controller'

router.get('/', async () => 'Hello wordl!')

router.get('/usersAll', [UsersController, 'index'])


router.post('/createUser', [UsersController, 'store'])

export default router
