import React, { createContext, useState, useEffect } from "react";
import useAuth from "@/features/auth/context/useAuth";
import { getAlunoTCC } from "@/services/tcc/getAlunoTCC";
import { type TCCData, type TCCContextType, statusTCC } from "@/types/tcc";

const TCCContext = createContext<TCCContextType | undefined>(undefined);

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
    data_inicio: null,
    prazo_entrega: null,
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

        const tccResponse = await getAlunoTCC();
        console.log("Resposta COMPLETA do TCC:", tccResponse);

        if (tccResponse.success) {
          console.log("TCC encontrado, atualizando dados...");
          console.log("ID do TCC:", tccResponse.id);
          console.log("Título:", tccResponse.titulo);
          console.log("Orientador:", tccResponse.orientador);
          console.log("Coorientador:", tccResponse.coorientador);

          setTccData({
            id: tccResponse.id,
            title: tccResponse.titulo,
            aluno: tccResponse.aluno.nome,
            curso: tccResponse.aluno.curso,
            orientador:
              typeof tccResponse.orientador === "string"
                ? tccResponse.orientador
                : tccResponse.orientador?.nome || "Não definido",
            coorientador:
              typeof tccResponse.coorientador === "string"
                ? tccResponse.coorientador
                : tccResponse.coorientador?.nome || "Não definido",
            progress: 0, // TODO: Implementar cálculo de progresso
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: "Universidade Federal",
            data_inicio: tccResponse.dataInicio || null,
            prazo_entrega: tccResponse.dataConclusao || null,
            status:
              statusTCC?.[
                tccResponse.statusAtual as unknown as keyof typeof statusTCC
              ] || "Planejamento",
          });
        } else {
          console.log("Nenhum TCC encontrado para o aluno");
          // Nenhum TCC encontrado
          setTccData({
            title: "Nenhum TCC Cadastrado",
            aluno: user.nome_completo,
            curso: user.role === "ALUNO" ? "Ciência da Computação" : "N/A",
            orientador: "Não definido",
            coorientador: "Não definido",
            progress: 0,
            checked: 0,
            total: 0,
            pending: 0,
            late: 0,
            institution: "Universidade Federal",
            data_inicio: null,
            prazo_entrega: null,
            status: "Planejamento",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do TCC:", error);
      // Em caso de erro, mostrar dados padrão
      if (user) {
        setTccData({
          title: "Nenhum TCC Cadastrado",
          aluno: user.nome_completo,
          curso: user.role === "ALUNO" ? "Ciência da Computação" : "N/A",
          orientador: "Não definido",
          coorientador: "Não definido",
          progress: 0,
          checked: 0,
          total: 0,
          pending: 0,
          late: 0,
          institution: "Universidade Federal",
          data_inicio: null,
          prazo_entrega: null,
          status: "Planejamento",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTCCData();
  });

  return (
    <TCCContext.Provider
      value={{ tccData, loading, refreshTCCData: fetchTCCData }}
    >
      {children}
    </TCCContext.Provider>
  );
};

export { TCCContext };
export default TCCProvider;
