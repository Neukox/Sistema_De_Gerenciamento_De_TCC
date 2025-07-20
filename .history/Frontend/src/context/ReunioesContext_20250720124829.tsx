import React, { createContext, useState } from "react";

export type Reuniao = {
  title: string;
  description: string;
  date: string;
  notes: string;
};

interface ReunioesContextProps {
  reunioes: Reuniao[];
  adicionarReuniao: (reuniao: Reuniao) => void;
}

export const ReunioesContext = createContext<ReunioesContextProps | undefined>(undefined);

export const ReunioesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);

  const adicionarReuniao = (reuniao: Reuniao) => {
    setReunioes((prev) => [...prev, reuniao]);
  };

  return (
    <ReunioesContext.Provider value={{ reunioes, adicionarReuniao }}>
      {children}
    </ReunioesContext.Provider>
  );
};

// Removido o hook useReunioes para evitar erro de Fast Refresh do React.
// Utilize o hook em um arquivo separado, por exemplo: useReunioes.ts
