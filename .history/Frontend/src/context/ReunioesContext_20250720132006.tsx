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
  const [tccId, setTccId] = useState<number | null>(null);

  // Busca reuniões do backend e atualiza contexto, filtrando pelo TCC do usuário
  const atualizarReunioes = useCallback(async (tcc_id?: number) => {
    try {
      const id = tcc_id || tccId;
      const response = await getReunioes(id ? { tcc_id: id } : undefined);
      if (response.success) {
        setReunioes(response.reunioes);
      }
    } catch (e) {
      console.error('Erro ao buscar reuniões:', e);
    }
  }, [tccId]);

  // Atualiza tccId ao montar, se disponível no localStorage ou contexto global
  React.useEffect(() => {
    // Tenta obter o tcc_id do localStorage ou de outro contexto
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.tcc_id) setTccId(parsed.tcc_id);
      } catch {}
    }
  }, []);

  // Buscar reuniões do TCC ao montar
  React.useEffect(() => {
    if (tccId) atualizarReunioes(tccId);
  }, [tccId, atualizarReunioes]);

  return (
    <ReunioesContext.Provider value={{ reunioes, atualizarReunioes }}>
      {children}
    </ReunioesContext.Provider>
  );
};
