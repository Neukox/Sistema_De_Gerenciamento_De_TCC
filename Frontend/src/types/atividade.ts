type StatusAtividade = "PENDENTE" | "CONCLUIDA";

export interface Atividade {
  id: string;
  nome: string;
  descricao: string;
  data_entrega: Date;
  concluido_em: Date | null;
  status: StatusAtividade;
}
