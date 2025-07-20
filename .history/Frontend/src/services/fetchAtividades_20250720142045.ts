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
  let base = import.meta.env.VITE_API_URL;
  // Remove /api do final da URL se existir
  if (base.endsWith('/api')) base = base.slice(0, -4);
  if (base.endsWith('/')) base = base.slice(0, -1);
  const url = `${base}/atividades`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
