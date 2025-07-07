// Configuração da API
export const API_BASE_URL = 'http://localhost:3000';

// Função helper para fazer requisições
export const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  return response;
};
