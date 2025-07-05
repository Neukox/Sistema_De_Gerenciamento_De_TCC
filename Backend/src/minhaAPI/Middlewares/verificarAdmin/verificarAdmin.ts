import { Request, Response, NextFunction } from 'express';

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
export function verificarAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      message: 'Acesso negado. Apenas administradores podem acessar esta área.',
      success: false
    });
  }
}
