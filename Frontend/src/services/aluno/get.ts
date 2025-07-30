import { API_CONFIG } from "@/config/api";
import api from "@/lib/api/axios";
import type { AlunoResponse } from "@/types/response/aluno";

/**
 * Função para obter os dados de um aluno.
 * @param id - ID do aluno a ser buscado.
 * @returns Promise com os dados do aluno.
 */
export default async function getAluno(id: number): Promise<AlunoResponse> {
  const response = await api.get<AlunoResponse>(
    API_CONFIG.ENDPOINTS.ALUNOS.GET_BY_ID + id
  );
  
  return response.data;
}
