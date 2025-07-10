import { API_CONFIG } from '../../config/api';

// Tipagem para a resposta do registro
export interface RegisterResponse {
  message: string;
  success: boolean;
  token: string;
  usuario: {
    id: number;
    nome_completo: string;
    email: string;
    role: string;
  };
}

// Tipagem para os dados de registro
export interface RegisterData {
  nome_completo: string;
  email: string;
  senha: string;
  tipo: 'ALUNO' | 'PROFESSOR';
  curso?: string;
  area_atuacao?: string;
  instituicao?: string;
}

/**
 * Função para realizar registro no sistema
 * @param registerData - Dados para criar nova conta
 * @returns Promise<RegisterResponse> - Resposta da API com token e dados do usuário
 */
export const fetchRegister = async (registerData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify(registerData),
    });

    // Verifica se a resposta não é OK antes de tentar fazer parse
    if (!response.ok) {
      // Tenta fazer parse do JSON para pegar a mensagem de erro
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      } catch {
        // Se não conseguir fazer parse, usa uma mensagem genérica
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    // Tenta fazer parse da resposta de sucesso
    const data = await response.json();

    // Salva o token no localStorage após registro bem-sucedido
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
    // Verifica se é um erro de rede (backend não está rodando)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Erro de conexão: Verifique se o servidor está rodando');
    }
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro desconhecido ao criar conta');
  }
};

/**
 * Função para validar se as senhas coincidem
 * @param password - Senha principal
 * @param confirmPassword - Confirmação da senha
 * @returns boolean - True se as senhas coincidem
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Função para validar se os emails coincidem
 * @param email - Email principal
 * @param confirmEmail - Confirmação do email
 * @returns boolean - True se os emails coincidem
 */
export const validateEmailMatch = (email: string, confirmEmail: string): boolean => {
  return email === confirmEmail;
};

/**
 * Função para validar força da senha
 * @param password - Senha a ser validada
 * @returns boolean - True se a senha atende aos critérios mínimos
 */
export const validatePasswordStrength = (password: string): boolean => {
  return password.length >= 6;
};