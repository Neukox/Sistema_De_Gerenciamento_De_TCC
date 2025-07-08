import { $Enums } from "@prisma/client";
import { MembroBanca } from "api/repositories/banca/interfaces";
import { GetTCCQuery } from "api/repositories/TCC/interfaces";

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

export interface GetOneTCC extends GetTCCQuery {
  orientador: MembroBanca;
  coorientador: MembroBanca | "Não definido"; // Pode ser um objeto MembroBanca ou uma string "Não definido
}
