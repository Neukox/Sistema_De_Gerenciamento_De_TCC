import { $Enums } from "@prisma/client";

export interface ICreateTCCService {
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio?: string;
  dataConclusao?: string;
  statusAtual: $Enums.StatusTCC;
  alunoId: number;
  orientadorId: number;
  coorientadorId?: number;
}

export interface CreateTCCServicePayload {
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: Date;
  dataConclusao: Date;
  statusAtual: string;
  aluno: string;
  orientador: string;
  coorientador?: string; // Opcional, pode ser nulo se não houver coorientador
}
