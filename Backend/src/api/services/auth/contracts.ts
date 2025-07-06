// Arquivo de contratos para o serviço de autenticação
// Este arquivo define as interfaces e tipos utilizados no serviço de autenticação.

import { $Enums } from "@prisma/client";

export interface ILoginService {
  email: string;
  password: string;
}

export interface IRegisterService {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: $Enums.TipoUsuario; // 'ALUNO', 'PROFESSOR' ou 'ADMINISTRADOR'
  course?: string; // Opcional, apenas para ALUNO
  areaOfExpertise?: string; // Opcional, apenas para PROFESSOR
}

export interface AuthPayload {
  token: string;
  user: {
    id: number;
    name: string;
    surname: string;
    role: string;
    email: string;
  };
}
