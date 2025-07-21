import React from "react";
import useAuth from "@/features/auth/context/useAuth";
import { getAlunoTCC } from "@/services/tcc/getAlunoTCC";
import { type TCCData, statusTCC } from "@/types/tcc";
import TCCContext from "./TCCContext";
import formatDate from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/response/base";
import type { GetTCCResponse } from "@/types/response/tcc";

interface TCCProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para o contexto do TCC
 * Fornece os dados do TCC e métodos para atualizar esses dados
 * @returns O contexto do TCC
 */

export const TCCProvider: React.FC<TCCProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery<
    GetTCCResponse,
    AxiosError<ApiResponse>
  >({
    queryKey: ["aluno-tcc", user?.id],
    queryFn: getAlunoTCC,
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 1,
  });

  console.log("=== INÍCIO FETCH TCC DATA ===");
  console.log("Dados do usuário:", user);
  console.log("Token no localStorage:", localStorage.getItem("token"));
  console.log("UserData no localStorage:", localStorage.getItem("userData"));

  console.log("Buscando TCC do aluno...");

  console.log("Resposta COMPLETA do TCC:", data);

  if (data?.success) {
    console.log("TCC encontrado, atualizando dados...");
    console.log("ID do TCC:", data.tcc.id);
    console.log("Título:", data.tcc.titulo);
    console.log("Orientador:", data.tcc.orientador);
    console.log("Coorientador:", data.tcc.coorientador);
  }

  const tccData: TCCData = data?.tcc
    ? {
        id: data.tcc.id,
        title: data.tcc.titulo,
        aluno: data.tcc.aluno.nome,
        curso: data.tcc.aluno.curso,
        orientador:
          typeof data.tcc.orientador === "string"
            ? data.tcc.orientador
            : data.tcc.orientador?.nome || "Não definido",
        coorientador:
          typeof data.tcc.coorientador === "string"
            ? data.tcc.coorientador
            : data.tcc.coorientador?.nome || "Não definido",
        data_inicio: data.tcc.dataInicio
          ? formatDate(data.tcc.dataInicio)
          : null,
        prazo_entrega: data.tcc.dataConclusao
          ? formatDate(data.tcc.dataConclusao)
          : null,
        status:
          statusTCC[
            data.tcc.statusAtual as unknown as keyof typeof statusTCC
          ] || "Planejamento",
      }
    : {
        id: 0,
        title: "",
        aluno: "",
        curso: "",
        orientador: "Não definido",
        coorientador: "Não definido",
        data_inicio: null,
        prazo_entrega: null,
        status: "Planejamento",
      };

  return (
    <TCCContext.Provider
      value={{
        tccData,
        loading: isLoading,
        refreshTCCData: async () => {
          await refetch();
        },
      }}
    >
      {children}
    </TCCContext.Provider>
  );
};

export default TCCProvider;
