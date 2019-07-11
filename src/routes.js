import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Bem Vindo a API MyMoney' });
});

export default routes;
