import axios from "axios";

/**
 * Instancia axios com a URL base da API e os cabeçalhos padrão.
 * A URL base é definida a partir da variável de ambiente VITE_API_URL.
 * Os cabeçalhos padrão incluem o tipo de conteúdo como JSON.
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
