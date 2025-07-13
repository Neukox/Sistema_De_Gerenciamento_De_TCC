import { Atividade } from "@prisma/client";
import prisma from "../../config/prisma";
import { ICreateAtividade } from "./interfaces";

/**
 * Função para criar uma nova atividade no banco de dados.
 * @param data - Dados da atividade a ser criada.
 * @returns A atividade criada ou null se falhar.
 */
export async function createAtividade(
  data: ICreateAtividade
): Promise<Atividade | null> {
  const atividades = await prisma.atividade.create({
    data: {
      nome: data.nome,
      descricao: data.descricao,
      data_entrega: data.dataEntrega,
      status: data.status,
      TCC_id: data.tccId,
    },
  });

  return atividades;
}
