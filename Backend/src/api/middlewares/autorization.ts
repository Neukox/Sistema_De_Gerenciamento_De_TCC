import { Request, Response, NextFunction } from "express";

/**
 * Middleware de autorização para verificar o token JWT no header Authorization.
 */
export default function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization está presente
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  // Verifica se o formato do header Authorization é válido
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      message: "Formato de token inválido.",
    });
  }

  // Extrai o token do header Authorization
  const token = parts[1];
  if (!token) {
    return res.status(401).json({ error: "Token inválido." });
  }

  // Armazena o token na requisição para uso posterior
  req.token = token;

  next();
}
