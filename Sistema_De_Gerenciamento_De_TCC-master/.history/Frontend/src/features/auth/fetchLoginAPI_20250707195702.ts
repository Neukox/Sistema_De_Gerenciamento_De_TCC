// src/features/auth/fetchLoginAPI.ts

export interface LoginResponseSuccess {
  token: string;
  message: string;
  success: true;
  usuario: {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    tipo: string;
    role: string;
  };
}

export interface LoginResponseError {
  message: string;
  success: false;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError;

export async function fetchLogin(email: string, senha: string): Promise<LoginResponseSuccess> {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: senha }),
  });

  const data: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro desconhecido ao fazer login.");
  }

  if (data.success) {
    return data;
  } else {
    throw new Error(data.message || "Login falhou.");
  }
}
