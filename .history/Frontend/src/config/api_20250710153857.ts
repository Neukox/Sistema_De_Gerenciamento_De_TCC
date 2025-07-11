// Configurações da API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
    },
    TCC: {
      GET_ALL: '/tcc',
      GET_BY_ID: '/tcc/:id',
      CREATE: '/tcc',
      UPDATE: '/tcc/:id',
      DELETE: '/tcc/:id',
    },
    USERS: {
      PROFILE: '/user/profile',
    },
  },
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Função para obter headers com token de autenticação
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...API_CONFIG.HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Função para fazer requisições autenticadas
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  // Se a resposta for 401 (não autorizado), remove o token e redireciona para login
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/login';
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return response;
};
