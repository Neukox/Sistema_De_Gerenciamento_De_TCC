import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import deleteReuniaoService from "../../services/reuniao/deleteReuniao";

/**
 * Controller para deletar/cancelar uma reunião
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const deleteReuniao = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  console.log("=== DELETAR REUNIÃO ===");
  console.log("User ID:", req.user?.id);
  console.log("Reunião ID:", req.params.id);

  const userId = Number(req.user?.id);
  const reuniaoId = parseInt(req.params.id, 10);

  await deleteReuniaoService(reuniaoId, userId);

  res.status(200).json({
    success: true,
    message: "Reunião deletada com sucesso.",
  });

  console.log("Reunião deletada com sucesso:", reuniaoId);
};

export default deleteReuniao;
