// Configuração da URL base da API
const API_BASE_URL = 'http://localhost:3000';

// Interface para os dados de login
export interface LoginData {
  email: string;
  senha: string;
}

// Interface para a resposta da API
export interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
  usuario?: {
    id: number;
    nomeCompleto: string;
    email: string;
    tipo: string;
    role: string;
  };
  error?: string;
}

// Função para fazer login via API
export const fetchLoginAPI = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erro no login');
    }

    // Se login for bem-sucedido, salva o token no localStorage
    if (result.success && result.token) {
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userData', JSON.stringify(result.usuario));
    }

    return result;
  } catch (error) {
    console.error('Erro na API de login:', error);
    
    // Retorna erro formatado
    return {
      message: error instanceof Error ? error.message : 'Erro desconhecido no login',
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

// Função para fazer logout
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

// Função para verificar se usuário está logado
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Função para obter token de autenticação
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para obter dados do usuário
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export default fetchLoginAPI;
