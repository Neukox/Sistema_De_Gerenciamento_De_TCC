// Configurações da API
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
    "http://localhost:3000/api",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      REQUEST_PASSWORD_RESET: "/auth/request-password-reset",
      RESET_PASSWORD: "/auth/reset-password",
    },
    TCC: {
      GET_BY_ALUNO: "/tccs/aluno",
      GET_ALL: "/tccs",
      GET_BY_ID: "/tccs/", // id do TCC deve ser concatenado
      CREATE: "/tccs",
      UPDATE: "/tccs/", // id do TCC deve ser concatenado
      DELETE: "/tccs/:id",
    },
    PROFESSORES: {
      GET_ALL: "/professores",
    },
    AREAS_CONHECIMENTO: {
      GET_ALL: "/areas-conhecimento",
      GET_BY_ID: "/areas-conhecimento/:id",
    },
    USERS: {
      PROFILE: "/user/profile",
    },
    PROGRESS: {
      GET_TCC_PROGRESS: "/progress/tcc/", // id do TCC deve ser concatenado
    },
    ATIVIDADES: {
      CREATE: "/atividades",
      GET_BY_TCC: "/atividades/tcc/", // id do TCC deve ser concatenado
      UPDATE: "/atividades/", // id da atividade deve ser concatenado
      DELETE: "/atividades/", // id da atividade deve ser concatenado
    },
    HISTORICO: {
      GET_TCC_HISTORICO: "/historico/tcc/", // id do TCC deve ser concatenado
    },
    ANOTACOES: {
      GET_BY_TCC: "anotacoes/tcc/", // id do TCC deve ser concatenado
      CREATE: "anotacoes",
      DELETE: "anotacoes/", // id da anotação deve ser concatenado
    },
  },
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// Função para obter headers com token de autenticação
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/login";
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return response;
};
