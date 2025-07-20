import React, { createContext, useContext, useState } from "react";

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

const ReunioesContext = createContext<ReunioesContextProps | undefined>(undefined);

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

// Mova o hook useReunioes para um arquivo separado, por exemplo: useReunioes.ts
}
