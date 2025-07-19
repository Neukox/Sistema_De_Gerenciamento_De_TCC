import { useState } from "react";
import { toast } from "react-toastify";
import { createReuniao } from "@/services/reunioes/reunioesService";
import type { CreateReuniaoRequest } from "@/types/reuniao";
import { useTCCContext } from "./useTCCContext";

/**
 * Hook para gerenciar a criação de reuniões
 */
export const useCreateReuniao = () => {
  const [loading, setLoading] = useState(false);
  const { tccData } = useTCCContext();

  const criarReuniao = async (data: Omit<CreateReuniaoRequest, 'tcc_id'>) => {
    if (!tccData?.id) {
      toast.error("Nenhum TCC encontrado para agendar reunião");
      return null;
    }

    setLoading(true);
    try {
      const reuniaoData: CreateReuniaoRequest = {
        ...data,
        tcc_id: tccData.id
      };

      const response = await createReuniao(reuniaoData);
      
      if (response.success) {
        toast.success(response.message);
        return response.reuniao;
      } else {
        toast.error("Erro ao criar reunião");
        return null;
      }
    } catch (error: unknown) {
      console.error("Erro ao criar reunião:", error);
      
      let errorMessage = "Erro ao criar reunião. Tente novamente.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }
      
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    criarReuniao,
    loading
  };
};
