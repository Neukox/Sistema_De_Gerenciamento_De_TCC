export interface IGetAllProfessores {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  area_atuacao: string;
  disponibilidade: boolean;
}

export interface GetAllProfessoresParams {
  nome?: string;
  disponivel?: boolean;
}
