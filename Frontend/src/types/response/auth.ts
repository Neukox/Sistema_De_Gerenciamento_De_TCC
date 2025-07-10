import type { ApiResponse } from "./base";

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
