// Configuração da URL base da API
const API_BASE_URL = 'http://localhost:3000';

// Interface para os dados de registro
export interface RegisterData {
  nomeCompleto: string;
  instituicao: string;
  email: string;
  confirmEmail: string;
  senha: string;
  confirmSenha: string;
}

// Interface para a resposta da API
export interface RegisterResponse {
  message: string;
  success: boolean;
  usuario?: {
    id: number;
    nomeCompleto: string;
    email: string;
    instituicao: string;
    tipo: string;
    role: string;
  };
  error?: any;
}

// Função para fazer registro via API
export const fetchRegisterAPI = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: RegisterResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erro no registro');
    }

    return result;
  } catch (error) {
    console.error('Erro na API de registro:', error);
    
    // Retorna erro formatado
    return {
      message: error instanceof Error ? error.message : 'Erro desconhecido no registro',
      success: false,
      error
    };
  }
};

export default fetchRegisterAPI;
