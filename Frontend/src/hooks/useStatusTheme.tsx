import type { StatusTCC } from "@/types/tcc";
import { useState, useEffect } from "react";

export interface Status extends StatusTCC {
  PENDENTE: "Pendente";
  ATRASADO: "Atrasado";
}

// Define o tipo do objeto que armazena as cores e nome do status
interface StatusInfo {
  cor: string; // Cor do texto do status
  colorBackground: string; // Cor de fundo do status
  nome: string; // Nome do status formatado para exibir
}

// Objeto que mapeia os nomes dos status para suas cores
const StatusColor = {
  PLANEJAMENTO: {
    cor: "text-[#4D7281]",
    colorBackground: "bg-[#BCD6FD]",
    nome: "Planejamento",
  },
  DESENVOLVIMENTO: {
    cor: "text-[#1D3A56]",
    colorBackground: "bg-[#BBDEFB]",
    nome: "Desenvolvimento",
  },
  REVISAO: {
    cor: "text-[#716C49]",
    colorBackground: "bg-[#FBEB93]",
    nome: "Revisão",
  },
  FINALIZACAO: {
    cor: "text-[#672D15]",
    colorBackground: "bg-[#FFE0B2]",
    nome: "Finalização",
  },
  CONCLUIDO: {
    cor: "text-[#202D21]",
    colorBackground: "bg-[#C8E6C9]",
    nome: "Concluído",
  },
  PENDENTE: {
    cor: "text-[#343534]",
    colorBackground: "bg-[#E0E0E0]",
    nome: "Pendente",
  },
  ATRASADO: {
    cor: "text-[#3F2C2C]",
    colorBackground: "bg-[#FFCDD2]",
    nome: "Atrasado",
  },
} satisfies Record<keyof Status, StatusInfo>;

/**
 * Hook para obter o tema de status baseado no status recebido
 * @param {string} statusKey - Chave do status para buscar as cores e nome
 * @returns {StatusInfo | null} - Objeto com as cores e nome do status
 */
export function useStatusTheme(statusKey: keyof Status) {
  // Estado local para armazenar o status atual com cores e nome
  const [stats, setStats] = useState<StatusInfo | null>(null);

  // Efeito que roda sempre que o statusKey mudar para atualizar o estado 'stats'
  useEffect(() => {
    // Busca as cores e dados do status no objeto StatusColor pelo nome normalizado
    const status = StatusColor[statusKey];

    // Se existir o status, atualiza o estado com as cores e o nome correto para exibir
    if (status) {
      setStats({
        cor: status.cor,
        colorBackground: status.colorBackground,
        nome: status.nome,
      });
    }
  }, [statusKey]);

  // Retorna o objeto com as cores e nome para ser usado no componente
  return stats;
}
