import { useState, useEffect } from "react";
import { getReunioes } from "@/services/reunioes/reunioesService";
import type { ReuniaoWithTCC } from "../types/reuniao";
import { useTCCContext } from "./useTCCContext";

/**
 * Hook para gerenciar reuniões
 */
export const useReunioes = () => {
  const [reunioes, setReunioes] = useState<ReuniaoWithTCC[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tccData } = useTCCContext();

  const fetchReunioes = async () => {
    if (!tccData?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await getReunioes({
        tcc_id: tccData.id,
        page: 1,
        limit: 5 // Buscar apenas as 5 mais recentes para o dashboard
      });

      if (response.success) {
        setReunioes(response.reunioes);
      } else {
        setError("Erro ao carregar reuniões");
      }
    } catch (err) {
      console.error("Erro ao buscar reuniões:", err);
      setError("Erro ao carregar reuniões");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReunioes();
  }, [tccData?.id]);

  return {
    reunioes,
    loading,
    error,
    refreshReunioes: fetchReunioes
  };
};
