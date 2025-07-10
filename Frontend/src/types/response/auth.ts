import type { ApiResponse } from "./base";

/**
 * Interface para a requisição de registro de usuário.
 * Inclui campos obrigatórios como nome completo, email, senha e tipo de usuário.
 * Tipo de usuário pode ser "aluno" ou "professor".
 * Campos adicionais como curso e área de atuação são variáveis, dependendo do tipo de usuário.
 */
export interface RegisterRequest {
  nome_completo: string;
  email: string;
  senha: string;
  tipo: "aluno" | "professor";
  curso?: string;
  area_atuação?: string;
}

/**
 * Interface para a resposta de autenticação da API.
 * Inclui o token JWT e informações do usuário autenticado.
 */
export interface AuthResponse extends ApiResponse {
  token?: string;
  usuario?: {
    id: string;
    nome_completo: string;
    email: string;
    role: string;
  };
}
