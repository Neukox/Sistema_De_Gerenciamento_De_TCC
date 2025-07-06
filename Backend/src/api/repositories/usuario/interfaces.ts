// Interfaces e tipos utilizados no repositório de usuários

export interface ICreateUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: "ALUNO" | "PROFESSOR" | "ADMIN";
}
