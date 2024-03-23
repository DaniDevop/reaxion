/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')

const TachesController = () => import('#controllers/taches_controller')

const ProjetsController = () => import('#controllers/projets_controller')

const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => 'Hello wordl!')

router.post('/registerUser', [AuthController, 'register'])
router.post('/loginUser', [AuthController, 'login'])

router
  .group(() => {
    router.get('/usersAll', [UsersController, 'index'])
    router.get('/userFind/:id', [UsersController, 'show'])

    router.post('/uploadUser', [UsersController, 'uploadFile'])

    router.put('/updateUser', [UsersController, 'update'])

    // Partie des projet

    router.get('/projetAll', [ProjetsController, 'index'])
    router.post('/createProjet', [ProjetsController, 'store'])
    router.get('/findProjet/:id', [ProjetsController, 'show'])
    router.put('updateProjet', [ProjetsController, 'update'])
    // Parties des Taches
    router.get('/tachesAll', [TachesController, 'index'])
    router.post('/creaTaches', [TachesController, 'store'])
    router.put('/updateTaches', [TachesController, 'update'])
    router.delete('/deleteTaches/:id', [TachesController, 'destroy'])

    router.post('/userTachesAll', [AuthController, 'findUserByNameOrEmail'])

  })
  .use(middleware.auth())
export default router
