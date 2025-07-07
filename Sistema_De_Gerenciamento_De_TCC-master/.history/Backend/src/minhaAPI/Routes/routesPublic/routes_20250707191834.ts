<<<<<<< HEAD
import { Router } from 'express';
import { Registro } from '../../Registro/registro';
import { Login } from '../../Login/login';
=======
import { Router, Request, Response } from 'express';
import { Registro } from '../../Registro/registro';
import { Login } from '../../Login/login';
import { listarAreasConhecimento, buscarAreaPorId } from '../../AreasConhecimento/listar';
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c

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
