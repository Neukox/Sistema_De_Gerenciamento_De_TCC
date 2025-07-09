import { Router, Request, Response, NextFunction } from 'express';
import { autorizacao } from '../../Middlewares/JWT/autorizacao';
import { cadastrarTCC } from '../../CadastrarTCC/cadastrar';
import { listarTCCs, buscarTCCPorId } from '../../ListarTCCs/listar';
import { listarAlunos, listarProfessores, listarProfessoresDisponiveis } from '../../ListarUsuarios/listar';
import { buscarProfessoresPorNome } from '../../BuscarProfessores/buscar';

// Interface para estender o Request com a propriedade user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    tipo: string;
    email: string;
  };
}

const routesPrivate = Router();

// Middleware de autorização - aplicado a todas as rotas privadas
routesPrivate.use(autorizacao);

// Rota de teste para usuários autenticados
routesPrivate.get('/', (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'Acesso autorizado!',
    success: true,
    user: req.user
  });
});

// Rota para listar dados do usuário logado
routesPrivate.get('/me', (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      message: 'Usuário não autenticado.',
      success: false
    });
    return;
  }
  
  res.json({
    message: 'Dados do usuário.',
    success: true,
    user: req.user
  });
});

// Rota para cadastrar TCC - qualquer usuário autenticado pode cadastrar
routesPrivate.post('/cadastrar-tcc', cadastrarTCC);

// Rotas para listar TCCs
routesPrivate.get('/tccs', listarTCCs);
routesPrivate.get('/tccs/:id', buscarTCCPorId);

// Rotas para listar usuários (úteis para formulários)
routesPrivate.get('/alunos', listarAlunos);
routesPrivate.get('/professores', listarProfessores);
routesPrivate.get('/professores/disponiveis', listarProfessoresDisponiveis);
routesPrivate.get('/professores/buscar', buscarProfessoresPorNome);

export default routesPrivate;
