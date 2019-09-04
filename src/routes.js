import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MovementController from './app/controllers/MovementController';
import CategoryController from './app/controllers/CategoryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Bem Vindo a API MyMoney' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/movements', MovementController.store);
routes.get('/movements', MovementController.index);
routes.delete('/movements/:id', MovementController.delete);

routes.post('/categorys', CategoryController.store);
routes.get('/categorys', CategoryController.index);
routes.delete('/categorys/:id', CategoryController.delete);

export default routes;
