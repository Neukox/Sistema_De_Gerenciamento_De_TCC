import { Router } from 'express';
import { Registro } from '../../Registro/registro';
import { Login } from '../../Login/login';

const routesPublic = Router();

// Rota de teste (opcional)
routesPublic.get('/', (req, res) => {
  res.send('API de Autenticação funcionando!');
});

// Rota de registro
routesPublic.post('/register', Registro);

// Rota de login - qualquer usuário pode fazer login
routesPublic.post('/login', Login);

export default routesPublic;
