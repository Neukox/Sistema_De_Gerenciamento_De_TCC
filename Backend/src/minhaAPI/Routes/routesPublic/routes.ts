import { Router, Request, Response } from 'express';
import { Registro } from '../../Registro/registro';
import { Login } from '../../Login/login';
import { listarAreasConhecimento, buscarAreaPorId } from '../../AreasConhecimento/listar';

const routesPublic = Router();

// Rota de teste (opcional)
routesPublic.get('/', (req: Request, res: Response) => {
  res.send('API de Autenticação funcionando!');
});

// Rota de registro
routesPublic.post('/register', Registro);

// Rota de login - qualquer usuário pode fazer login
routesPublic.post('/login', Login);

// Rotas para Áreas de Conhecimento (públicas para seleção no cadastro de TCC)
routesPublic.get('/areas-conhecimento', listarAreasConhecimento);
routesPublic.get('/areas-conhecimento/:id', buscarAreaPorId);

export default routesPublic;
