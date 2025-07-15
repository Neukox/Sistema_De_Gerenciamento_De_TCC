import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { getUserData } from '../features/auth/fetchLoginAPI';
import { getTCCByAluno } from '../services/fetchTCC';
import type { TCCData, TCCContextType } from '../types/tcc';

const TCCContext = createContext<TCCContextType | undefined>(undefined);

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
      console.log('Dados do usuário:', userData);
      
      if (userData) {
        // Buscar TCC real do aluno
        console.log('Buscando TCC do aluno...');
        const tccResponse = await getTCCByAluno();
        console.log('Resposta do TCC:', tccResponse);
        
        if (tccResponse) {
          console.log('TCC encontrado, atualizando dados...');
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
          console.log('Nenhum TCC encontrado para o aluno');
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

export { TCCContext };
export default TCCProvider;
