import { CalculateProgress } from "../../types/progress";

export interface GetTCCProgress {
  id: number;
  titulo: string;
  aluno: {
    nome_completo: string;
    curso: string;
  };
  orientador: {
    nome_completo: string;
    area_atuacao: string;
  };
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
