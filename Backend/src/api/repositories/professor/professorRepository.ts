import { Professor } from "@prisma/client";
import prisma from "../../config/prisma";
import { GetAllProfessoresParams, IGetAllProfessores } from "./interfaces";

/**
 * Função para criar um professor no banco de dados
 * @param {Pick<Professor, "fk_Usuario_id" | "area_atuacao">} data - Dados do professor a ser criado
 * @returns {Promise<Professor | null>} Retorna o professor criado ou null se não for possível criar
 */
export async function createProfessor(
  data: Pick<Professor, "fk_Usuario_id" | "area_atuacao">
): Promise<Professor | null> {
  const professor = await prisma.professor.create({
    data: {
      fk_Usuario_id: data.fk_Usuario_id,
      area_atuacao: data.area_atuacao,
      disponibilidade: true, // Definindo disponibilidade como true por padrão
    },
  });

  return professor;
}

/**
 * Função para buscar todos os professores no banco de dados
 * @param {GetAllProfessoresParams} params - Parâmetros de busca
 * @returns {Promise<IGetAllProfessores[]>} Retorna uma lista de professores
 */
export async function findAllProfessores(
  params: GetAllProfessoresParams
): Promise<IGetAllProfessores[]> {
  const professores = await prisma.professor.findMany({
    where: {
      ...(params.disponivel && {
        disponibilidade: params.disponivel,
      }),
      ...(params.nome && {
        Usuario: {
          nome: {
            contains: params.nome,
            mode: "insensitive", // Ignora maiúsculas/minúsculas
          },
        },
      }),
    },
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

  return professores.map((professor) => ({
    id: professor.fk_Usuario_id,
    nome: professor.Usuario.nome,
    sobrenome: professor.Usuario.sobrenome,
    email: professor.Usuario.email,
    area_atuacao: professor.area_atuacao,
    disponibilidade: professor.disponibilidade,
  }));
}
