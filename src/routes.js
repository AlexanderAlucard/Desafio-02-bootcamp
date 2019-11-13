import { Router } from 'express';

// Controlles
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import auth from './app/middlewares/Auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/students', StudentController.store);

routes.put('/students', auth, StudentController.update);

routes.post('/sessions', SessionController.store);

export default routes;
