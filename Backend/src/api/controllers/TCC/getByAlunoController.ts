import { Request, Response } from "express";
import { ResponseError } from "../../helpers/ResponseError";
import { findTCCByAlunoId } from "../../repositories/TCC/TCCRepository";
import { RequestWithUser } from "../../types/auth";

export default async function getTCCByAlunoController(
  req: RequestWithUser,
  res: Response
): Promise<Response> {
  try {
    const user = req.user;
    console.log('=== DEBUG getTCCByAlunoController ===');
    console.log('User from req:', user);

    if (!user) {
      console.log('Usuário não encontrado no req.user');
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado",
      });
    }

    console.log('User ID:', user.id);
    console.log('User role:', user.role);

    // Apenas alunos podem buscar seus próprios TCCs
    if (user.role !== "ALUNO") {
      console.log('Usuário não é ALUNO:', user.role);
      return res.status(403).json({
        success: false,
        message: "Apenas alunos podem buscar seus TCCs",
      });
    }

    console.log('Buscando TCC para o aluno ID:', user.id);
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
