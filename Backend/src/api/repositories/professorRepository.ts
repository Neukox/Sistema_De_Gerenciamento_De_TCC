import { Professor } from "@prisma/client";
import prisma from "../config/prisma";

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
