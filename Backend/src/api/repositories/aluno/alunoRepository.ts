import { Aluno } from "@prisma/client";
import prisma from "../../config/prisma";
import { GetAlunos } from "./interfaces";

/**
 * Função para buscar todos os alunos no banco de dados
 * @returns {Promise<Aluno | null>} Retorna o aluno encontrado ou null se não existir
 */
export async function findAllAlunos(): Promise<GetAlunos[]> {
  const alunos = await prisma.aluno.findMany({
    include: {
      Usuario: {
        select: {
          email: true,
          nome_completo: true,
        },
      },
    },
  });

  return alunos.map((aluno) => ({
    id: aluno.Usuario_id,
    nome_completo: aluno.Usuario.nome_completo,
    email: aluno.Usuario.email,
    curso: aluno.curso,
  }));
}

/**
 * Função para criar um aluno no banco de dados
 * @param {Aluno} data - Dados do aluno a ser criado
 * @returns {Promise<Aluno | null>} Retorna o aluno encontrado ou null se não existir
 */
export async function createAluno(data: Aluno): Promise<Aluno | null> {
  const aluno = await prisma.aluno.create({
    data: {
      Usuario_id: data.Usuario_id,
      curso: data.curso,
    },
  });

  return aluno;
}
