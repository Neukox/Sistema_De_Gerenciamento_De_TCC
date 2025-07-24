import { $Enums } from "@prisma/client";

/**
 * Interface para criar um histórico de ações no TCC.
 */

export interface ICreateHistoricoTcc {
  acao: $Enums.AcoesHistorico;
  entidade: $Enums.EntidadesHistorico;
  entidadeId: number;
  usuarioId: number;
  tccId: number;
  detalhes?: string;
}

/**
 * Interface para o histórico de ações no TCC.
 */
export interface IHistoricoTcc {
  id: number;
  acao: $Enums.AcoesHistorico;
  entidade: $Enums.EntidadesHistorico;
  entidadeId: number;
  tccId: number;
  detalhes?: string;
  feito_em: Date;
  Usuario: {
    id: number;
    nome_completo: string;
  };
}

/**
 * Interface para parametros de busca do histórico de ações no TCC.
 */

export interface IHistoricoTccParams {
  acao?: $Enums.AcoesHistorico;
  entidade?: $Enums.EntidadesHistorico;
  data?: "hoje" | "semana" | "mes";
  page?: number;
  limit?: number;
}
