import prisma from "../../config/prisma";
import { HistoricoTcc } from "@prisma/client";
import { ICreateHistoricoTcc, IHistoricoTccParams } from "./intefaces";
import { getDateRange } from "api/utils/date";

/**
 * Função para criar um histórico de ações no TCC.
 * @param data - Dados do histórico a ser criado.
 * @returns Promise com o histórico criado.
 */

export async function createHistoricoTcc(
  data: ICreateHistoricoTcc
): Promise<void> {
  await prisma.historicoTcc.create({
    data: {
      acao: data.acao,
      entidade: data.entidade,
      entidadeId: data.entidadeId,
      usuarioId: data.usuarioId,
      tccId: data.tccId,
      detalhes: data.detalhes,
    },
  });
}

/**
 * Função para buscar o histórico de ações de um TCC específico.
 * @param tccId - ID do TCC para buscar o histórico.
 * @returns Promise com o histórico encontrado.
 */
export async function getHistoricoTcc(
  tccId: number,
  params: IHistoricoTccParams
): Promise<HistoricoTcc[] | null> {
  const where: any = { tccId };
  let skip: number | undefined;
  let take: number | undefined;

  if (params.acao) {
    where.acao = params.acao;
  }

  if (params.entidade) {
    where.entidade = params.entidade;
  }

  if (params.data) {
    const filtroData = getDateRange(params.data);
    where.feito_em = {
      gte: filtroData.gte,
      lte: filtroData.lte,
    };
  }

  if (params.page && params.limit) {
    skip = (params.page - 1) * params.limit;
    take = params.limit;
  }

  return await prisma.historicoTcc.findMany({
    where,
    orderBy: { feito_em: "desc" },
    include: { Usuario: true },
    skip,
    take,
  });
}
