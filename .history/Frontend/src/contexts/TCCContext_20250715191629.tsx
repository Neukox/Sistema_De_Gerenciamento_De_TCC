import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getUserData } from '../features/auth/fetchLoginAPI';
import { getTCCByAluno } from '../services/fetchTCC';

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
  checked: number;
  total: number;
  pending: number;
  late: number;
  data_inicio?: string | null;
  prazo_entrega?: string | null;
  status: string;
}

export interface TCCContextType {
  tccData: TCCData;
  loading: boolean;
  refreshTCCData: () => Promise<void>;
}

export const TCCContext = createContext<TCCContextType | undefined>(undefined);

interface TCCProviderProps {
  children: ReactNode;
}

export const TCCProvider: React.FC<TCCProviderProps> = ({ children }) => {
  const [tccData, setTccData] = useState<TCCData>({
    title: 'Nenhum TCC Cadastrado',
    aluno: 'Carregando...',
    curso: 'Carregando...',
    orientador: 'Não definido',
    coorientador: 'Não definido',
    progress: 0,
    checked: 0,
    total: 0,
    pending: 0,
    late: 0,
    institution: 'Carregando...',
    data_inicio: '-',
    prazo_entrega: '-',
    status: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchTCCData = async () => {
    setLoading(true);
    try {
      const userData = getUserData();
      
      if (userData) {
        // Buscar TCC real do aluno
        const tccResponse = await getTCCByAluno();
        
        if (tccResponse) {
          setTccData({
            id: tccResponse.id,
            title: tccResponse.titulo,
            aluno: tccResponse.aluno.nome,
            curso: tccResponse.aluno.curso,
            orientador: tccResponse.orientador.nome,
            coorientador: typeof tccResponse.coorientador === 'string' 
              ? tccResponse.coorientador 
              : tccResponse.coorientador?.nome || 'Não definido',
            progress: 0, // TODO: Implementar cálculo de progresso
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: 'Universidade Federal',
            data_inicio: tccResponse.dataInicio || null,        
            prazo_entrega: tccResponse.dataConclusao || null,
            status: tccResponse.statusAtual || 'planejamento'
          });
        } else {
          // Nenhum TCC encontrado
          setTccData({
            title: 'Nenhum TCC Cadastrado',
            aluno: userData.nome_completo,
            curso: userData.role === 'ALUNO' ? 'Ciência da Computação' : 'N/A',
            orientador: 'Não definido',
            coorientador: 'Não definido',
            progress: 0,
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: 'Universidade Federal',
            data_inicio: '-',        
            prazo_entrega: '-',
            status: 'planejamento'
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do TCC:', error);
      // Em caso de erro, mostrar dados padrão
      const userData = getUserData();
      if (userData) {
        setTccData({
          title: 'Nenhum TCC Cadastrado',
          aluno: userData.nome_completo,
          curso: userData.role === 'ALUNO' ? 'Ciência da Computação' : 'N/A',
          orientador: 'Não definido',
          coorientador: 'Não definido',
          progress: 0,
          checked: 0,
          total: 0,
          pending: 0,
          late: 0,
          institution: 'Universidade Federal',
          data_inicio: '-',        
          prazo_entrega: '-',
          status: 'planejamento'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTCCData();
  }, []);

  return (
    <TCCContext.Provider value={{ tccData, loading, refreshTCCData: fetchTCCData }}>
      {children}
    </TCCContext.Provider>
  );
};
