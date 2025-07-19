import { API_CONFIG } from '../../config/api';

// Tipagem para a resposta da solicitação de recuperação de senha
export interface PasswordResetRequestResponse {
  message: string;
  success: boolean;
}

// Tipagem para os dados da solicitação de recuperação de senha
export interface PasswordResetRequestData {
  email: string;
}

// Tipagem para a resposta da redefinição de senha
export interface PasswordResetResponse {
  message: string;
  success: boolean;
}

// Tipagem para os dados da redefinição de senha
export interface PasswordResetData {
  usuario_id: number;
  token: string;
  nova_senha: string;
}

/**
 * Função para solicitar recuperação de senha
 * @param requestData - Dados contendo o email para recuperação
 * @returns Promise<PasswordResetRequestResponse> - Resposta da API
 */
export const fetchRequestPasswordReset = async (
  requestData: PasswordResetRequestData
): Promise<PasswordResetRequestResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET}`,
      {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao solicitar recuperação de senha');
    }

    const data: PasswordResetRequestResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro desconhecido ao solicitar recuperação de senha');
  }
};

/**
 * Função para redefinir senha
 * @param resetData - Dados contendo usuário ID, token e nova senha
 * @returns Promise<PasswordResetResponse> - Resposta da API
 */
export const fetchResetPassword = async (
  resetData: PasswordResetData
): Promise<PasswordResetResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD}`,
      {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(resetData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao redefinir senha');
    }

    const data: PasswordResetResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro desconhecido ao redefinir senha');
  }
};

/**
 * Função para validar email
 * @param email - Email a ser validado
 * @returns boolean - True se o email é válido
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
