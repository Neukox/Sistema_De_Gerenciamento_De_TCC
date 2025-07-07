import { Request } from "express";

export interface DecodedUser {
  id: number;
  nome_completo: string; // Nome completo do usuário
  role: string;
  email: string;
}
