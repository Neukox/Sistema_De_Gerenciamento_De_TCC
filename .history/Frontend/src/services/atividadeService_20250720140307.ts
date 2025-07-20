import axios from 'axios';

export const criarAtividade = async (atividadeData: any, token: string) => {
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
