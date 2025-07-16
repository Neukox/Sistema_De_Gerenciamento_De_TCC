import type { StatusTCC } from "../tcc";

/**
 * Tipagem de dados da resposta da API para obter TCC
 */
export interface GetTCCResponse {
  id: number;
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: Date | null;
  dataConclusao: Date | null;
  statusAtual: keyof StatusTCC | null;
  criado_em: Date;
  aluno: {
    id: number;
    nome: string;
    curso: string;
    email: string;
  };
  areaConhecimento?: {
    id?: number;
    nome?: string;
  };
  orientador?:
    | {
        id: number;
        nome: string;
        area_atuacao: string;
        email: string;
      }
    | "Não definido";
  coorientador?:
    | {
        id: number;
        nome: string;
        area_atuacao: string;
        email: string;
      }
    | "Não definido";
}
