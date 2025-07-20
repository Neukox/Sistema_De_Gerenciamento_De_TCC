import { createContext } from "react";
import type { ReunioesContextProps } from "./ReunioesContext";

export const ReunioesContext = createContext<ReunioesContextProps | undefined>(undefined);
