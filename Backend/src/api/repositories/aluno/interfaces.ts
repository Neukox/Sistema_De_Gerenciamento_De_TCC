import { Aluno } from "@prisma/client";

// interfaces para o repositório de alunos

export interface GetAlunos {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  curso: string;
}
