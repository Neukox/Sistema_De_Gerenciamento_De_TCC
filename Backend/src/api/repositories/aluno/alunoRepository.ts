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
          nome: true,
          sobrenome: true,
          email: true,
        },
      },
    },
  });

  return alunos.map((aluno) => ({
    id: aluno.fk_Usuario_id,
    nome: aluno.Usuario.nome,
    sobrenome: aluno.Usuario.sobrenome,
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
      fk_Usuario_id: data.fk_Usuario_id,
      curso: data.curso,
    },
  });

  return aluno;
}
