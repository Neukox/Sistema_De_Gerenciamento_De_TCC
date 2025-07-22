import type React from "react";

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
  id: number;
  titulo: string;
  resumo: string;
  tema: string;
  aluno: string;
  curso: string;
  area_conhecimento: string;
  orientador: string;
  coorientador: string;
  data_inicio: string ;
  prazo_entrega: string;
  status: string;
}

export interface TCCContextType {
  tccData: TCCData;
  loading: boolean;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTCCData: () => Promise<void>;
}
