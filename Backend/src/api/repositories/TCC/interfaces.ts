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
  };
}

export interface ICreateTCC {
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio?: Date;
  dataConclusao?: Date;
  statusAtual: $Enums.StatusTCC;
  alunoId: number;
  orientadorId: number;
  coorientadorId?: number; // Opcional, pode ser nulo se não houver coorientador
}

export interface CreateTCCPayload {
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: Date | null;
  dataConclusao: Date | null;
  statusAtual: $Enums.StatusTCC;
  aluno: string;
  orientador: string;
  coorientador?: string; // Opcional, pode ser nulo se não houver coorientador
}
