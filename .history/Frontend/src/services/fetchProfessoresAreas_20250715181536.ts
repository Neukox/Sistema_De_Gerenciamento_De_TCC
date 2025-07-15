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
  categoria: string;
}

// Áreas de conhecimento estáticas baseadas no enum do schema.prisma
export const AREAS_CONHECIMENTO_ESTATICAS: AreaConhecimento[] = [
  { id: 1, nome: 'Ciências Humanas', categoria: 'CIENCIAS_HUMANAS' },
  { id: 2, nome: 'Ciências Exatas', categoria: 'CIENCIAS_EXATAS' },
  { id: 3, nome: 'Ciências Biológicas', categoria: 'CIENCIAS_BIOLOGICAS' },
  { id: 4, nome: 'Engenharias', categoria: 'ENGENHARIAS' },
  { id: 5, nome: 'Ciências Sociais', categoria: 'CIENCIAS_SOCIAIS' },
  { id: 6, nome: 'Ciências Agrárias', categoria: 'CIENCIAS_AGRARIAS' },
  { id: 7, nome: 'Linguística', categoria: 'LINGUISTICA' },
  { id: 8, nome: 'Tecnologia', categoria: 'TECNOLOGIA' },
  { id: 9, nome: 'Artes', categoria: 'ARTES' },
  { id: 10, nome: 'Saúde', categoria: 'SAUDE' },
  { id: 11, nome: 'Outros', categoria: 'OUTROS' },
];

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
 * Primeiro tenta buscar do backend, se falhar usa as estáticas
 */
export const getAreasConhecimento = async (): Promise<AreaConhecimento[]> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Se não houver token, retorna as áreas estáticas
      return AREAS_CONHECIMENTO_ESTATICAS;
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

    return response.data.areas || response.data || AREAS_CONHECIMENTO_ESTATICAS;
  } catch (error: unknown) {
    console.warn('Erro ao buscar áreas de conhecimento do backend, usando estáticas:', error);
    
    // Em caso de erro, retorna as áreas estáticas
    return AREAS_CONHECIMENTO_ESTATICAS;
  }
};
