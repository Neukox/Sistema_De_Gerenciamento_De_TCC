import axios from 'axios';

export interface AtividadeBackend {
  id: number;
  nome: string;
  descricao: string;
  dataEntrega?: string;
  data_entrega?: string;
  status: string;
}

export const fetchAtividades = async (token: string): Promise<AtividadeBackend[]> => {
  const base = import.meta.env.VITE_API_URL;
  const url = base.endsWith('/') ? base + 'atividades' : base + '/atividades';
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
