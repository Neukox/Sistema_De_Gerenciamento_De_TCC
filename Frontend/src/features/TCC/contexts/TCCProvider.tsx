import React, { useState, useEffect } from "react";
import useAuth from "@/features/auth/context/useAuth";
import { getAlunoTCC } from "@/services/tcc/getAlunoTCC";
import { type TCCData, statusTCC } from "@/types/tcc";
import TCCContext from "./TCCContext";
import formatDate from "@/utils/format-date";

interface TCCProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para o contexto do TCC
 * Fornece os dados do TCC e métodos para atualizar esses dados
 * @returns O contexto do TCC
 */

export const TCCProvider: React.FC<TCCProviderProps> = ({ children }) => {
  const [tccData, setTccData] = useState<TCCData>({
    title: "Nenhum TCC Cadastrado",
    aluno: "Carregando...",
    curso: "Carregando...",
    orientador: "Carregando...",
    coorientador: "Carregando...",
    progress: 0,
    checked: 0,
    total: 0,
    pending: 0,
    late: 0,
    institution: "Carregando...",
    data_inicio: "-",
    prazo_entrega: "-",
    status: "Planejamento",
  });
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchTCCData = async () => {
    setLoading(true);

    try {
      console.log("=== INÍCIO FETCH TCC DATA ===");
      console.log("Dados do usuário:", user);
      console.log("Token no localStorage:", localStorage.getItem("token"));
      console.log(
        "UserData no localStorage:",
        localStorage.getItem("userData")
      );

      if (user) {
        // Buscar TCC real do aluno
        console.log("Buscando TCC do aluno...");

        const { success, tcc } = await getAlunoTCC();
        console.log("Resposta COMPLETA do TCC:", tcc);

        if (success) {
          console.log("TCC encontrado, atualizando dados...");
          console.log("ID do TCC:", tcc.id);
          console.log("Título:", tcc.titulo);
          console.log("Orientador:", tcc.orientador);
          console.log("Coorientador:", tcc.coorientador);

          setTccData({
            id: tcc.id,
            title: tcc.titulo,
            aluno: tcc.aluno.nome,
            curso: tcc.aluno.curso,
            orientador:
              typeof tcc.orientador === "string"
                ? tcc.orientador
                : tcc.orientador?.nome || "Não definido",
            coorientador:
              typeof tcc.coorientador === "string"
                ? tcc.coorientador
                : tcc.coorientador?.nome || "Não definido",
            progress: 0, // TODO: Implementar cálculo de progresso
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: "Universidade Federal",
            data_inicio: formatDate(tcc.dataInicio || "-", false),
            prazo_entrega: formatDate(tcc.dataConclusao || "-", false),
            status:
              statusTCC?.[
                tcc.statusAtual as unknown as keyof typeof statusTCC
              ] || "Planejamento",
          });
        } else {
          console.log("Nenhum TCC encontrado para o aluno");
          setTccData({
            title: "Nenhum TCC Cadastrado",
            aluno: "Carregando...",
            curso: "Carregando...",
            orientador: "Carregando...",
            coorientador: "Carregando...",
            progress: 0,
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: "Carregando...",
            data_inicio: null,
            prazo_entrega: null,
            status: "Planejamento",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do TCC:", error);
      setTccData({
        title: "Nenhum TCC Cadastrado",
        aluno: "Carregando...",
        curso: "Carregando...",
        orientador: "Carregando...",
        coorientador: "Carregando...",
        progress: 0,
        checked: 0,
        total: 0,
        pending: 0,
        late: 0,
        institution: "Carregando...",
        data_inicio: null,
        prazo_entrega: null,
        status: "Planejamento",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTCCData();
  }, [user]); // Só executa quando 'user' mudar

  return (
    <TCCContext.Provider
      value={{ tccData, loading, refreshTCCData: fetchTCCData }}
    >
      {children}
    </TCCContext.Provider>
  );
};

export default TCCProvider;
