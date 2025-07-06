import { Request, Response, NextFunction } from "express";

/**
 * Middleware para verificar se o usuário tem uma das roles permitidas.
 * @param {string[]} roles - Lista de roles permitidas.
 * @returns {Function} Middleware que verifica a role do usuário.
 */
export default function allowRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // obtem o papel do usuário da requisição
    const userRole = req.user?.role;

    // Verifica se o papel do usuário está na lista de roles permitidas
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    next();
  };
}
