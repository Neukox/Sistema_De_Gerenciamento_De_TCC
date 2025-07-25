import type { AcoesHistorico, EntidadesHistorico } from "../historico";

export interface GetTCCHistoricoParams {
  acao?: AcoesHistorico;
  entidade?: EntidadesHistorico;
  data?: "hoje" | "semana" | "mes";
  page?: number;
  limit?: number;
}
