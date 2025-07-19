import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface CreateTCCRequest {
  titulo: string;
  tema: string;
  resumo: string;
  dataInicio?: string;
  dataConclusao?: string;
  statusAtual: string;
  areaConhecimentoId: number;
  orientadorId: number;
  coorientadorId?: number;
}

export interface CreateTCCResponse {
  success: boolean;
  message: string;
  tcc?: {
    id: number;
    titulo: string;
    tema: string;
    curso: string;
    resumo: string;
    dataInicio: string;
    dataConclusao: string;
    statusAtual: string;
    criado_em: string;
    aluno: {
      id: number;
      nome: string;
      curso: string;
    };
    areaConhecimento: {
      id: number;
      nome: string;
    };
    orientador: {
      id: number;
      nome: string;
      area_atuacao: string;
      email: string;
    };
    coorientador?: {
      id: number;
      nome: string;
      area_atuacao: string;
      email: string;
    };
  };
}

/**
 * Serviço para criar um novo TCC
 */
export const createTCC = async (data: CreateTCCRequest): Promise<CreateTCCResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/tccs`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao criar TCC:', error);
    
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Erro ao criar TCC');
    }
    
    throw new Error('Erro desconhecido ao criar TCC');
  }
};