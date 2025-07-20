import axios from 'axios';
import { CardInfos } from '../hooks/useCard';

export const fetchAtividades = async (token: string): Promise<CardInfos[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/atividades`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  // Ajuste conforme o backend retorna os dados
  return response.data;
};
