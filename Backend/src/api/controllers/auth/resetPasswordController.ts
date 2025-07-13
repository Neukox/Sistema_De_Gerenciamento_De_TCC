import { Request, Response } from "express";
import resetPasswordService from "../../services/auth/resetPasswordService";

/**
 * Controlador para redefinir a senha de um usuário
 * @param {Request} req - Requisição contendo o ID do usuário e a nova senha
 * @param {Response} res - Resposta a ser enviada ao cliente
 */

export async function resetPasswordController(
  req: Request,
  res: Response
): Promise<Response> {
  const { token, nova_senha } = req.body;

  if (!token || !nova_senha) {
    return res.status(400).json({
      message: "Token e nova senha são obrigatórios.",
      success: false,
    });
  }

  const updatedUser = await resetPasswordService(token, nova_senha);

  if (!updatedUser) {
    return res.status(404).json({
      message: "Usuário não encontrado ou erro ao atualizar a senha.",
      success: false,
    });
  }

  return res
    .status(200)
    .json({ message: "Senha atualizada com sucesso.", success: true });
}
