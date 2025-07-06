import { Request, Response } from "express";
import { getAllAlunosService } from "../../services/aluno/getAllService";

/**
 * Controlador para buscar todos os alunos
 * @param {Request} req - Requisição HTTP
 * @param {Response} res - Resposta HTTP
 */
export async function getAllAlunosController(req: Request, res: Response) {
  const alunos = await getAllAlunosService();
  return res.status(200).json({
    message: "Alunos encontrados com sucesso.",
    success: true,
    alunos: alunos,
  });
}
