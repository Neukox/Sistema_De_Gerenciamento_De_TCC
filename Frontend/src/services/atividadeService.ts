import axios from 'axios';

export interface AtividadeData {
  nome: string;
  descricao: string;
  dataEntrega: string;
  status: string;
  tccId: number;
  responsavel?: string;
}

function getApiUrl(path: string) {
  let base = import.meta.env.VITE_API_URL;
  if (base.endsWith('/')) base = base.slice(0, -1);
  if (path.startsWith('/')) path = path.slice(1);
  return `${base}/${path}`;
}

export const criarAtividade = async (atividadeData: AtividadeData, token: string) => {
  const response = await axios.post(
    getApiUrl('atividades'),
    atividadeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
