import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTCC } from '@/services/fetchTCC';
import { useTCCContext } from './useTCCContext';
import type { CreateTCCRequest } from '@/services/fetchTCC';

interface CadastrarTCCForm {
  titulo: string;
  tema: string;
  resumo: string;
  dataInicio: string;
  dataConclusao: string;
  statusAtual: string;
  areaConhecimentoId: string;
  orientador: string;
  coorientador: string;
}

export const useCadastrarTCC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshTCCData } = useTCCContext();

  const cadastrarTCC = async (formData: CadastrarTCCForm) => {
    setLoading(true);

    try {
      // Converter os dados do formulário para o formato da API
      const tccData: CreateTCCRequest = {
        titulo: formData.titulo,
        tema: formData.tema,
        resumo: formData.resumo,
        dataInicio: formData.dataInicio || undefined,
        dataConclusao: formData.dataConclusao || undefined,
        statusAtual: formData.statusAtual,
        areaConhecimentoId: parseInt(formData.areaConhecimentoId),
        orientadorNome: formData.orientador.trim(),
        coorientadorNome: formData.coorientador.trim() || undefined,
      };

      const response = await createTCC(tccData);

      if (response.success) {
        toast.success('TCC cadastrado com sucesso!');
        
        // Atualizar os dados do TCC no contexto
        await refreshTCCData();
        
        // Redirecionar para o dashboard
        navigate('/maindashboard');
      } else {
        toast.error(response.message || 'Erro ao cadastrar TCC');
      }
    } catch (error) {
      console.error('Erro ao cadastrar TCC:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido ao cadastrar TCC');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    cadastrarTCC,
    loading,
  };
};
