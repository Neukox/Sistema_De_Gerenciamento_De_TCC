import { API_CONFIG } from '../../config/api';

// Tipagens para a API de redefinição de senha
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordData {
  usuario_id: number;
  token: string;
  nova_senha: string;
}

// Função para validar força da senha
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos uma letra minúscula.' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos uma letra maiúscula.' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'A senha deve conter pelo menos um número.' };
  }
  return { isValid: true, message: '' };
};

// Função para redefinir senha
export const fetchResetPassword = async (
  resetData: ResetPasswordData
): Promise<ResetPasswordResponse> => {
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
      // Tenta pegar a mensagem de erro do backend
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      } catch {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    const data: ResetPasswordResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro desconhecido ao redefinir senha');
  }
};