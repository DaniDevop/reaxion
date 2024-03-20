/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => 'Hello wordl!')

router.get('/usersAll', [UsersController, 'index'])

router.get('/userFind/:id', [UsersController, 'show'])

router.post('/createUser', [UsersController, 'store'])

router.put('/updateUser', [UsersController, 'update'])
//



export default router
