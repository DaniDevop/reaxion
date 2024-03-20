import router from '@adonisjs/core/services/router';
import UsersController from '#controllers/users_controller';

router.post('/createUser', [UsersController, 'store']);
