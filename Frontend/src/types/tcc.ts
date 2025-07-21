/**
 * Define os possíveis status de um TCC
 */
export type StatusTCC = {
  PLANEJAMENTO: "Planejamento";
  DESENVOLVIMENTO: "Desenvolvimento";
  REVISAO: "Revisão";
  FINALIZACAO: "Finalização";
  CONCLUIDO: "Concluído";
};

/**
 * Define os status de TCC disponíveis
 */
export const statusTCC: StatusTCC = {
  PLANEJAMENTO: "Planejamento",
  DESENVOLVIMENTO: "Desenvolvimento",
  REVISAO: "Revisão",
  FINALIZACAO: "Finalização",
  CONCLUIDO: "Concluído",
};

/**
 * Tipagem de dados do TCC
 */
export interface TCCData {
  id?: number;
  title: string;
  aluno: string;
  curso: string;
  orientador: string;
  coorientador: string;
  data_inicio?: string | null;
  prazo_entrega?: string | null;
  status: string;
}

export interface TCCContextType {
  tccData: TCCData;
  loading: boolean;
  refreshTCCData: () => Promise<void>;
}
