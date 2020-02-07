import { Router } from 'express';

import RecipientController from './app/controlers/RecipientController';
import SessionController from './app/controlers/SessionController';
import UserController from './app/controlers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/session', SessionController.store);
routes.get('/session', SessionController.index);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);

export default routes;
