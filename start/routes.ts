/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TachesController = () => import('#controllers/taches_controller')

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
router.get('/tachesAll', [TachesController, 'index'])
router.post('/creaTaches', [TachesController, 'store'])
router.put('/updateTaches', [TachesController, 'update'])
router.delete('/deleteTaches/:id', [TachesController, 'destroy'])

export default router

