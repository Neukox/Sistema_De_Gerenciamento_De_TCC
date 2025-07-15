import { Request, Response } from "express";
import { ResponseError } from "../../helpers/ResponseError";
import { findTCCByAlunoId } from "../../repositories/TCC/TCCRepository";
import { RequestWithUser } from "../../types/requestWithUser";

export default async function getTCCByAlunoController(
  req: RequestWithUser,
  res: Response
): Promise<Response> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado",
      });
    }

    // Apenas alunos podem buscar seus próprios TCCs
    if (user.role !== "ALUNO") {
      return res.status(403).json({
        success: false,
        message: "Apenas alunos podem buscar seus TCCs",
      });
    }

    const tcc = await findTCCByAlunoId(user.id);

    if (!tcc) {
      return res.status(404).json({
        success: false,
        message: "Nenhum TCC encontrado para este aluno",
      });
    }

    return res.status(200).json({
      success: true,
      message: "TCC encontrado com sucesso",
      tcc,
    });
  } catch (error) {
    console.error("Erro ao buscar TCC do aluno:", error);

    if (error instanceof ResponseError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
