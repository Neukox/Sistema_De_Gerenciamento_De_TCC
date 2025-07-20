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
  const [debug, setDebug] = useState<any>(null);

  // Busca reuniões do backend e atualiza contexto (sem limitação de quantidade)
  const atualizarReunioes = useCallback(async () => {
    try {
      const response = await getReunioes();
      setDebug(response); // log visual para depuração
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
      setDebug({ error: String(err) });
      setReunioes([]);
    }
  }, []);

  // Buscar todas as reuniões ao montar
  React.useEffect(() => {
    atualizarReunioes();
  }, [atualizarReunioes]);

  return (
    <>
      {/* Log visual para depuração do contexto */}
      <div style={{position: 'fixed', bottom: 0, left: 0, background: '#fff', color: '#222', fontSize: 10, zIndex: 9999, maxWidth: 400, maxHeight: 200, overflow: 'auto', border: '1px solid #ccc', padding: 4}}>
        <strong>DEBUG CONTEXTO:</strong>
        <pre>{JSON.stringify(debug, null, 2)}</pre>
      </div>
      <ReunioesContext.Provider value={{ reunioes, atualizarReunioes }}>
        {children}
      </ReunioesContext.Provider>
    </>
  );
};
