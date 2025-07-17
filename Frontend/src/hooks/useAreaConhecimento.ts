import { useState, useEffect } from "react";
import type { AreaConhecimento } from "@/types/area-conhecimento";
import { AxiosError } from "axios";

/**
 * Hook para gerenciar áreas de conhecimento.
 * Este hook busca as áreas de conhecimento disponíveis e as retorna.
 */
export default function useAreaConhecimento() {
  const [areasConhecimento, setAreasConhecimento] = useState<
    AreaConhecimento[] | null
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    const fetchAreasConhecimento = async () => {
      try {
        const response = await fetch("/api/areas-conhecimento");
        if (!response.ok) {
          throw new Error("Erro ao buscar áreas de conhecimento");
        }
        const data: AreaConhecimento[] = await response.json();
        setAreasConhecimento(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error("Erro desconhecido ao buscar áreas de conhecimento")
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAreasConhecimento();
  }, []);

  return { areasConhecimento, loading, error };
}
