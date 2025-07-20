import { useContext } from "react";
import { ReunioesContext } from "./ReunioesContextObj";

export function useReunioes() {
  const context = useContext(ReunioesContext);
  if (!context) throw new Error("useReunioes deve ser usado dentro do ReunioesProvider");
  return context;
}
