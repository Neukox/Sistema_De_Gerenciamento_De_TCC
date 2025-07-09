import { $Enums, TCC } from "@prisma/client";

export interface ICreateTCCService {
  titulo: string;
  tema: string;
  resumo: string;
  dataInicio?: string;
  dataConclusao?: string;
  statusAtual: $Enums.StatusTCC;
  alunoId: number;
  areaConhecimentoId: number;
  orientadorId: number;
  coorientadorId?: number;
}

export interface CreateTCCServicePayload {
  id: number;
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: Date;
  dataConclusao: Date;
  statusAtual: string;
  criado_em: Date;
  aluno: {
    id: number;
    nome: string;
    curso: string;
  };
  areaConhecimento: {
    id: number;
    nome: string;
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
