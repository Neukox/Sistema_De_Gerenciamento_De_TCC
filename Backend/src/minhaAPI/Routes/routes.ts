import { Router } from 'express';
import { Registro } from '../Registro/registro';
import { Login } from '../Login/login';

const routes = Router();

// Rota de teste (opcional)
routes.get('/', (req, res) => {
  res.send('API de Autenticação funcionando!');
});

// Rota de registro
routes.post('/register', Registro);

// Rota de login
routes.post('/login', Login);

export default routes;
