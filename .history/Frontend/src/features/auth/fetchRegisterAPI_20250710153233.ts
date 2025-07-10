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

// Configuração da URL base da API
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Função para realizar registro no sistema
 * @param registerData - Dados para criar nova conta
 * @returns Promise<RegisterResponse> - Resposta da API com token e dados do usuário
 */
export const fetchRegister = async (registerData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao criar conta');
    }

    // Salva o token no localStorage após registro bem-sucedido
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
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