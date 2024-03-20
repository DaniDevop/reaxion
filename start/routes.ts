/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProjetsController = () => import('#controllers/projets_controller')

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => 'Hello wordl!')

router.get('/usersAll', [UsersController, 'index'])

router.get('/userFind/:id', [UsersController, 'show'])

router.post('/createUser', [UsersController, 'store'])

router.put('/updateUser', [UsersController, 'update'])

// Partie des projet

router.get('/projetAll', [ProjetsController, 'index'])
router.post('createProjet', [ProjetsController, 'store'])
router.get('/findProjet/:id', [ProjetsController, 'show'])
router.put('updateProjet', [ProjetsController, 'update'])
// Parties des Taches

export default router
