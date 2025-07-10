// Tipagem para a resposta do login
export interface LoginResponse {
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

// Tipagem para os dados de login
export interface LoginData {
  email: string;
  password: string;
}

// Configuração da URL base da API
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Função para realizar login no sistema
 * @param loginData - Dados de email e senha para autenticação
 * @returns Promise<LoginResponse> - Resposta da API com token e dados do usuário
 */
export const fetchLogin = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    // Salva o token no localStorage para uso posterior
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro desconhecido ao fazer login');
  }
};

/**
 * Função para verificar se o usuário está autenticado
 * @returns boolean - True se o usuário está logado
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Função para fazer logout
 */
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

/**
 * Função para obter dados do usuário logado
 * @returns objeto com dados do usuário ou null
 */
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};