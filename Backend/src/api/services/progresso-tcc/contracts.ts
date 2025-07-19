import { CalculateProgress } from "../../types/progress";

export interface GetTCCProgress {
  id: number;
  titulo: string;
  aluno: {
    nome_completo: string;
    curso: string;
  };
  orientador:
    | {
        nome_completo: string;
        area_atuacao: string;
      }
    | "Não definido";
  coorientador?:
    | {
        nome_completo: string;
        area_atuacao: string;
      }
    | "não definido";
  progresso: {
    total: number;
    status: string;
    status_atual: string;
    detalhamento: {
      tarefas: {
        pontuacao: number;
        peso: number;
        total: number;
        concluidas: number;
      };
      etapas: {
        pontuacao: number;
        peso: number;
        total: number;
        concluidas: number;
      };
      anotacoes: {
        pontuacao: number;
        peso: number;
        total: number;
        minimo: number;
      };
      reunioes: {
        pontuacao: number;
        peso: number;
        agendadas: number;
        realizadas: number;
      };
      defesas: {
        pontuacao: number;
        peso: number;
        preBanca: boolean;
        bancaFinal: boolean;
      };
    };
  };
}

/**
 * Interface para o progresso do TCC retornado pelo serviço getTCCProgressByProfessorService
 */
export interface GetTCCProgressByProfessor {
  tcc_id: number;
  titulo: string;
  aluno: string;
  progresso_total: number;
  status_atual: string;
}
