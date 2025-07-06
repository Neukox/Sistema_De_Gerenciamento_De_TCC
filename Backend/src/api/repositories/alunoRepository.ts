import { Aluno } from "@prisma/client";
import prisma from "../config/prisma";

/**
 * Função para criar um aluno no banco de dados
 * @param {Aluno} data - Dados do aluno a ser criado
 * @returns {Promise<Aluno | null>} Retorna o aluno encontrado ou null se não existir
 */
export async function createAluno(data: Aluno): Promise<Aluno | null> {
  const aluno = await prisma.aluno.create({
    data: {
      fk_Usuario_id: data.fk_Usuario_id,
      curso: data.curso,
    },
  });

  return aluno;
}
