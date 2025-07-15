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
  orientadorNome: string;
  coorientadorNome?: string;
}

export interface TCCResponse {
  id: number;
  titulo: string;
  tema: string;
  curso: string;
  resumo: string;
  dataInicio: string | null;
  dataConclusao: string | null;
  statusAtual: string;
  criado_em: string;
  aluno: {
    id: number;
    nome: string;
    curso: string;
    email: string;
  };
  areaConhecimento: {
    id: number;
    nome: string;
  } | null;
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
  } | "Não definido";
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
 * Serviço para buscar o TCC do aluno logado
 */
export const getTCCByAluno = async (): Promise<TCCResponse | null> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/tccs/aluno`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log('Resposta BRUTA da API /tccs/aluno:', response.data);
    console.log('TCC extraído:', response.data.tcc);

    return response.data.tcc || null;
  } catch (error: unknown) {
    console.error('Erro ao buscar TCC:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        // TCC não encontrado é um caso válido
        return null;
      }
      
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'Erro ao buscar TCC');
      }
    }
    
    throw new Error('Erro desconhecido ao buscar TCC');
  }
};

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