// Tipagem para dados do TCC
export interface TCCData {
  id?: number;
  title: string;
  aluno: string;
  curso: string;
  orientador: string;
  coorientador: string;
  progress: number;
  institution: string;
  checked: number;
  total: number;
  pending: number;
  late: number;
  data_inicio?: string | null;
  prazo_entrega?: string | null;
  status: string;
}

export interface TCCContextType {
  tccData: TCCData;
  loading: boolean;
  refreshTCCData: () => Promise<void>;
}
