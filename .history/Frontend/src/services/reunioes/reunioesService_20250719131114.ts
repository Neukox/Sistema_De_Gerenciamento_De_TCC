import api from "@/lib/api/axios";
import type { StatusReuniao, ReuniaoWithTCC, CreateReuniaoRequest, UpdateReuniaoRequest } from "@/types/reuniao";

export interface GetReunioesResponse {
  success: boolean;
  reunioes: ReuniaoWithTCC[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateReuniaoResponse {
  success: boolean;
  message: string;
  reuniao: ReuniaoWithTCC;
}

export interface UpdateReuniaoResponse {
  success: boolean;
  message: string;
  reuniao: ReuniaoWithTCC;
}

export interface DeleteReuniaoResponse {
  success: boolean;
  message: string;
}

/**
 * Criar uma nova reunião
 */
export const createReuniao = async (data: CreateReuniaoData): Promise<CreateReuniaoResponse> => {
  const response = await api.post<CreateReuniaoResponse>("/reunioes", data);
  return response.data;
};

/**
 * Listar reuniões com filtros opcionais
 */
export const getReunioes = async (params?: {
  tcc_id?: number;
  status?: StatusReuniao;
  page?: number;
  limit?: number;
}): Promise<GetReunioesResponse> => {
  const response = await api.get<GetReunioesResponse>("/reunioes", { params });
  return response.data;
};

/**
 * Buscar reunião por ID
 */
export const getReuniaoById = async (id: number): Promise<{ success: boolean; reuniao: Reuniao }> => {
  const response = await api.get<{ success: boolean; reuniao: Reuniao }>(`/reunioes/${id}`);
  return response.data;
};

/**
 * Atualizar reunião
 */
export const updateReuniao = async (id: number, data: UpdateReuniaoData): Promise<UpdateReuniaoResponse> => {
  const response = await api.put<UpdateReuniaoResponse>(`/reunioes/${id}`, data);
  return response.data;
};

/**
 * Deletar/cancelar reunião
 */
export const deleteReuniao = async (id: number, forceDelete = false): Promise<DeleteReuniaoResponse> => {
  const response = await api.delete<DeleteReuniaoResponse>(`/reunioes/${id}?forceDelete=${forceDelete}`);
  return response.data;
};
