import api from "@/lib/api/axios";
import type { GetTCCResponse, UpdateTCCRequest } from "@/types/response/tcc";

/**
 * Serviço para atualizar um TCC existente
 * @param id - ID do TCC a ser atualizado
 * @param data - Dados para atualização do TCC
 * @returns Promise com a resposta da API
 */
export const updateTCC = async (id: number, data: UpdateTCCRequest): Promise<GetTCCResponse> => {
  const response = await api.put<GetTCCResponse>(`/tccs/${id}`, data);
  return response.data;
};
