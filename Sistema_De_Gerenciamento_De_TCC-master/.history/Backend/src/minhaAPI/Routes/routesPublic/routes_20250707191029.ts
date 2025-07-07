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
<<<<<<< HEAD
routesPublic.get('/', (req, res) => {
=======
routesPublic.get('/', (req: Request, res: Response) => {
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
  res.send('API de Autenticação funcionando!');
});

// Rota de registro
routesPublic.post('/register', Registro);

// Rota de login - qualquer usuário pode fazer login
routesPublic.post('/login', Login);

<<<<<<< HEAD
=======
// Rotas para Áreas de Conhecimento (públicas para seleção no cadastro de TCC)
routesPublic.get('/areas-conhecimento', listarAreasConhecimento);
routesPublic.get('/areas-conhecimento/:id', buscarAreaPorId);

>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
export default routesPublic;
