import React, { useState, useCallback } from "react";
import { ReunioesContext } from "./ReunioesContextObj";
import type { ReuniaoWithTCC } from "@/types/reuniao";
import { getReunioes } from "@/services/reunioes/reunioesService";

export interface ReunioesContextProps {
  reunioes: ReuniaoWithTCC[];
  atualizarReunioes: () => Promise<void>;
}

export const ReunioesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reunioes, setReunioes] = useState<ReuniaoWithTCC[]>([]);

  // Busca reuniões do backend e atualiza contexto (sem limitação de quantidade)
  const atualizarReunioes = useCallback(async () => {
    try {
      const response = await getReunioes();
      if (
        response &&
        response.success &&
        response.data &&
        Array.isArray(response.data.reunioes)
      ) {
        setReunioes(response.data.reunioes);
      } else {
        setReunioes([]); // fallback para garantir array
      }
    } catch (err) {
      setReunioes([]);
    }
  }, []);

  // Buscar todas as reuniões ao montar
  React.useEffect(() => {
    atualizarReunioes();
  }, [atualizarReunioes]);

  return (
    <ReunioesContext.Provider value={{ reunioes, atualizarReunioes }}>
      {children}
    </ReunioesContext.Provider>
  );
};
