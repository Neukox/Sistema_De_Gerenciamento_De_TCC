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
      // Remove o parâmetro limit para buscar todas as reuniões
      const response = await getReunioes();
      if (response.success) {
        setReunioes(response.reunioes);
      }
    } catch {
      // Pode adicionar tratamento de erro se necessário
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
