// src/features/auth/fetchRegisterAPI.ts
import { makeRequest } from '../../config/api';

export interface RegisterResponseSuccess {
  message: string;
  success: true;
  usuario: {
    id: number;
    nomeCompleto: string;
    email: string;
    tipo: string;
    role: string;
  };
}

export interface RegisterResponseError {
  message: string;
  success: false;
}

export type RegisterResponse = RegisterResponseSuccess | RegisterResponseError;

export async function fetchRegister(nomeCompleto: string, email: string, senha: string): Promise<RegisterResponseSuccess> {
  const response = await makeRequest("/register", {
    method: "POST",
    body: JSON.stringify({ 
      nomeCompleto, 
      email, 
      password: senha 
    }),
  });

  const data: RegisterResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro desconhecido ao fazer registro.");
  }

  if (data.success) {
    return data;
  } else {
    throw new Error(data.message || "Registro falhou.");
  }
}
