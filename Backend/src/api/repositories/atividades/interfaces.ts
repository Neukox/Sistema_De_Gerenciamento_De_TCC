import { $Enums } from "@prisma/client";

export interface ICreateAtividade {
  nome: string;
  descricao: string;
  dataEntrega: Date;
  status: $Enums.StatusAtividade;
  tccId: number;
}