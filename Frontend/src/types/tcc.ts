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
  progress: number;
  institution: string;
  checked: number;
  total: number;
  pending: number;
  late: number;
  data_inicio?: string | null;
  prazo_entrega?: string | null;
  status: (typeof statusTCC)[keyof typeof statusTCC];
}

export interface TCCContextType {
  tccData: TCCData;
  loading: boolean;
  refreshTCCData: () => Promise<void>;
}
