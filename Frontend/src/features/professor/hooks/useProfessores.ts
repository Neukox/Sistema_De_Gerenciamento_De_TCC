import { useState, useEffect } from "react";
import getAllProfessores from "@/services/professores/get-all";
import type {
  GetProfessor,
  GetAllProfessoresParams,
} from "@/types/response/professor";
import { AxiosError } from "axios";

/**
 * Hook para obter a lista de professores e gerenciar o estado do professor selecionado.
 * @returns {Object} Objeto contendo a lista de professores e o estado do professor selecionado.
 */
export default function useProfessores(
  initalParams: GetAllProfessoresParams = { nome: "", disponibilidade: true }
) {
  const [professores, setProfessores] = useState<GetProfessor[] | null>([]);
  const [params, setParams] = useState<GetAllProfessoresParams>(initalParams);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await getAllProfessores({
          nome: params.nome,
          disponibilidade: params.disponibilidade,
        });
        setProfessores(response?.data as GetProfessor[]);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Erro desconhecido ao buscar professores"));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfessores();
  }, [params]);

  return { professores, loading, error, setParams };
}
