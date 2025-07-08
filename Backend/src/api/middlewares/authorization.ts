import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/jwt";
import { DecodedUser } from "../types/auth";
import { RequestWithUser } from "../types/auth";

/**
 * Middleware de autorização para verificar o token JWT no header Authorization.
 */
export default function authorization(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const parts = authHeader?.split(" ");

  // Verifica se o header Authorization está presente
  if (!authHeader || !parts?.[1]) {
    res.status(401).json({ success: false, message: "Token não fornecido." });
    return;
  }

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      success: false,
      message: "Formato de token inválido.",
    });
    return;
  }

  // verifica se o token é válido
  const token = parts[1];
  const decoded = verifyJwtToken(token);

  if (!decoded) {
    res.status(401).json({
      success: false,
      message: "Token inválido.",
    });
    return;
  }

  // Adiciona os dados decodificados do usuário à requisição
  req.user = decoded as DecodedUser;

  next();
}
