import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface Professor {
  id: number;
  nome: string;
  email: string;
  area_atuacao: string;
}

export interface AreaConhecimento {
  id: number;
  nome: string;
}

/**
 * Buscar todos os professores
 */
export const getProfessores = async (): Promise<Professor[]> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/professores`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.professores || response.data || [];
  } catch (error: unknown) {
    console.error('Erro ao buscar professores:', error);
    
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Erro ao buscar professores');
    }
    
    throw new Error('Erro desconhecido ao buscar professores');
  }
};

/**
 * Buscar todas as áreas de conhecimento
 */
export const getAreasConhecimento = async (): Promise<AreaConhecimento[]> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/areas-conhecimento`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.areas || response.data || [];
  } catch (error: unknown) {
    console.error('Erro ao buscar áreas de conhecimento:', error);
    
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || 'Erro ao buscar áreas de conhecimento');
    }
    
    throw new Error('Erro desconhecido ao buscar áreas de conhecimento');
  }
};
