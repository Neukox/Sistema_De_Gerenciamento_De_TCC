import { useState, useEffect } from 'react';
import { getUserData } from '../features/auth/fetchLoginAPI';

// Tipagem para dados do TCC
interface TCCData {
  id?: number;
  title: string;
  aluno: string;
  curso: string;
  orientador: string;
  coorientador: string;
  progress: number;
  institution: string;
}

// Hook personalizado para dados do TCC
export const useTCCData = () => {
  const [tccData, setTccData] = useState<TCCData>({
    title: 'Carregando...',
    aluno: 'Carregando...',
    curso: 'Carregando...',
    orientador: 'Não definido',
    coorientador: 'Não definido',
    progress: 0,
    institution: 'Carregando...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTCCData = async () => {
      try {
        const userData = getUserData();
        
        if (userData) {
          // Simula dados do TCC baseados no usuário logado
          // Em uma implementação real, você faria uma chamada para a API
          setTccData({
            title: 'Sistema de Gerenciamento de TCC',
            aluno: userData.nome_completo,
            curso: userData.role === 'ALUNO' ? 'Ciência da Computação' : 'N/A',
            orientador: 'Prof. Dr. João Silva',
            coorientador: 'Prof. Dra. Maria Santos',
            progress: 35,
            institution: 'Universidade Federal'
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do TCC:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTCCData();
  }, []);

  return { tccData, loading };
};
