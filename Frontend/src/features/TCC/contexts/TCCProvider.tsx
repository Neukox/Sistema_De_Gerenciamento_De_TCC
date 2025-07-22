import React, { useState } from "react";
import useAuth from "@/features/auth/context/useAuth";
import { getAlunoTCC } from "@/services/tcc/getAlunoTCC";
import { type TCCData } from "@/types/tcc";
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
  const [editable, setEditable] = useState<boolean>(false);
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

  const tccData: TCCData = data?.tcc
    ? {
        id: data.tcc.id,
        titulo: data.tcc.titulo,
        resumo: data.tcc.resumo,
        tema: data.tcc.tema,
        area_conhecimento: data.tcc.areaConhecimento ?? "",
        aluno: data.tcc.aluno.nome,
        curso: data.tcc.aluno.curso,
        orientador:
          typeof data.tcc.orientador === "string"
            ? data.tcc.orientador
            : data.tcc.orientador?.nome || "",
        coorientador:
          typeof data.tcc.coorientador === "string"
            ? data.tcc.coorientador
            : data.tcc.coorientador?.nome || "",
        data_inicio: data.tcc.dataInicio ? formatDate(data.tcc.dataInicio) : "",
        prazo_entrega: data.tcc.dataConclusao
          ? formatDate(data.tcc.dataConclusao)
          : "",
        status: data.tcc.statusAtual as unknown as string,
      }
    : {
        id: 0,
        titulo: "",
        tema: "",
        resumo: "",
        aluno: "",
        curso: "",
        area_conhecimento: "",
        orientador: "",
        coorientador: "",
        data_inicio: "",
        prazo_entrega: "",
        status: "PLANEJAMENTO",
      };

  return (
    <TCCContext.Provider
      value={{
        tccData,
        loading: isLoading,
        refreshTCCData: async () => {
          await refetch();
        },
        editable,
        setEditable,
      }}
    >
      {children}
    </TCCContext.Provider>
  );
};

export default TCCProvider;
