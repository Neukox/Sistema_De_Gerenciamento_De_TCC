import { $Enums } from "@prisma/client";

export interface GetTCCQuery {
  id: number;
  titulo: string;
  tema: string;
  resumo: string;
  dataInicio: Date | null;
  dataConclusao: Date | null;
  statusAtual: $Enums.StatusTCC;
  criado_em: Date;
  atualizado_em: Date;
  finalizado_em?: Date | null;
  aluno: {
    id: number;
    nome: string;
    curso: string;
    email: string;
  };
  areaConhecimento?: string;
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

export interface ICreateTCC {
  titulo: string;
  tema: string;
  resumo: string;
  dataInicio?: Date;
  dataConclusao?: Date;
  statusAtual: $Enums.StatusTCC;
  alunoId: number;
  areaConhecimentoId: number;
  orientadorId: number;
  coorientadorId?: number;
}

export interface CreateTCCPayload {
  id: number;
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: Date | null;
  dataConclusao: Date | null;
  statusAtual: $Enums.StatusTCC;
  criado_em: Date;
  aluno: {
    id: number;
    nome: string;
    curso: string;
    email: string;
  };
  areaConhecimento: {
    id?: number;
    nome?: string;
  };
  orientador: {
    id: number;
    nome: string;
    area_atuacao: string;
    email: string;
  };
  coorientador?:
    | {
        id: number;
        nome: string;
        area_atuacao: string;
        email: string;
      }
    | "Não definido";
}
