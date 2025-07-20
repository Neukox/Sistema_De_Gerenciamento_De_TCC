import axios from 'axios';

export type AtividadeData = {
  nome: string;
  descricao: string;
  data: string;
  prioridade: string;
  status: string;
  responsavel?: string;
};

export const criarAtividade = async (atividadeData: AtividadeData, token: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/atividades`,
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
