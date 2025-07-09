// Interfaces e tipos utilizados no repositório de usuários

export interface ICreateUser {
  fullName: string;
  email: string;
  password: string;
  type: "ALUNO" | "PROFESSOR" | "ADMIN";
}
