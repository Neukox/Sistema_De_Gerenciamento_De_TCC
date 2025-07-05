import { Router } from 'express';
import routesPublic from './routesPublic/routes';
import routesPrivate from './routesPrivate/routes';

const routes = Router();

// Usando as rotas públicas (sem autenticação)
routes.use('/', routesPublic);

// Usando as rotas privadas (com autenticação)
routes.use('/', routesPrivate);

export default routes;
