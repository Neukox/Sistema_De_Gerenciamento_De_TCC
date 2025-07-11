import { API_CONFIG } from '../../config/api';

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

/**
 * Função para realizar login no sistema
 * @param loginData - Dados de email e senha para autenticação
 * @returns Promise<LoginResponse> - Resposta da API com token e dados do usuário
 */
export const fetchLogin = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify(loginData),
    });

    // Verifica se a resposta não é OK antes de tentar fazer parse
    if (!response.ok) {
      // Tenta fazer parse do JSON para pegar a mensagem de erro
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      } catch (parseError) {
        // Se não conseguir fazer parse, usa uma mensagem genérica
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    // Tenta fazer parse da resposta de sucesso
    const data = await response.json();

    // Salva o token no localStorage para uso posterior
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