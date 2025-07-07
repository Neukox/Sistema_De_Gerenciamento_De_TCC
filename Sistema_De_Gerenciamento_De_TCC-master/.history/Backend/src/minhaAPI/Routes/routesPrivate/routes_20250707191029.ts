import { Router, Request, Response, NextFunction } from 'express';
import { autorizacao } from '../../Middlewares/JWT/autorizacao';
<<<<<<< HEAD
=======
import { cadastrarTCC } from '../../CadastrarTCC/cadastrar';
import { listarTCCs, buscarTCCPorId } from '../../ListarTCCs/listar';
import { listarAlunos, listarProfessores, listarProfessoresDisponiveis } from '../../ListarUsuarios/listar';
import { buscarProfessoresPorNome } from '../../BuscarProfessores/buscar';
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c

// Interface para estender o Request com a propriedade user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    tipo: string;
    email: string;
  };
}

// Middleware para verificar se o usuário é admin
const verificarAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      message: 'Acesso negado. Apenas administradores podem acessar esta área.',
      success: false
    });
  }
};

const routesPrivate = Router();

// Rota protegida para página principal - teste de autorização
routesPrivate.get('/home', autorizacao, (req: AuthenticatedRequest, res: Response) => {
  // Aqui você pode acessar todas as informações do token
  const { id, email, role, tipo } = req.user!;
  
  res.status(200).json({
    message: `Bem-vindo à página principal, ${tipo}!`,
    success: true,
    usuario: {
      id,
      email,
      role,
      tipo
    },
    timestamp: new Date().toISOString(),
    permissoes: {
      isAdmin: role === 'admin',
      isUser: role === 'user',
      tipo: tipo
    }
  });
});

// Rota protegida apenas para admins - teste adicional
routesPrivate.get('/admin', autorizacao, verificarAdmin, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    message: 'Área administrativa - Acesso restrito para administradores',
    success: true,
    usuario: req.user,
    timestamp: new Date().toISOString()
  });
});

// Rota para perfil do usuário - qualquer usuário autenticado
routesPrivate.get('/perfil', autorizacao, (req: AuthenticatedRequest, res: Response) => {
  const { id, email, role, tipo } = req.user!;
  
  res.status(200).json({
    message: 'Dados do perfil do usuário',
    success: true,
    usuario: {
      id,
      email,
      role,
      tipo
    }
  });
});

<<<<<<< HEAD
=======
// Rota para cadastrar TCC - qualquer usuário autenticado pode cadastrar
routesPrivate.post('/cadastrar-tcc', autorizacao, cadastrarTCC);

// Rotas para listar TCCs
routesPrivate.get('/tccs', autorizacao, listarTCCs);
routesPrivate.get('/tccs/:id', autorizacao, buscarTCCPorId);

// Rotas para listar usuários (úteis para formulários)
routesPrivate.get('/alunos', autorizacao, listarAlunos);
routesPrivate.get('/professores', autorizacao, listarProfessores);
routesPrivate.get('/professores/disponiveis', autorizacao, listarProfessoresDisponiveis);
routesPrivate.get('/professores/buscar', autorizacao, buscarProfessoresPorNome);

>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
export default routesPrivate;
