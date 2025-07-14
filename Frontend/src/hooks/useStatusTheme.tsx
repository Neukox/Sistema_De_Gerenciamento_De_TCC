import { useState, useEffect } from "react";

// Define o tipo do objeto que armazena as cores e nome do status
interface StatusInfo {
  cor: string;              // Cor do texto do status
  colorBackground: string;  // Cor de fundo do status
  nome: string;             // Nome do status formatado para exibir
}

// Objeto que mapeia os nomes dos status para suas cores
const StatusColor: Record<string, { cor: string; colorBackground: string }> = {
  Planejamento: { cor: '#4D7281', colorBackground: '#BCD6FD' },
  Desenvolvimento: { cor: '#1D3A56', colorBackground: '#BBDEFB' },
  Revisão: { cor: '#716C49', colorBackground: '#FBEB93' },
  Finalização: { cor: '#672D15', colorBackground: '#FFE0B2' },
  Concluído: { cor: '#202D21', colorBackground: '#C8E6C9' },
  Pendente: { cor: '#343534', colorBackground: '#E0E0E0' },
  Atrasado: { cor: '#3F2C2C', colorBackground: '#FFCDD2' },
};

// Função que normaliza uma string, removendo acentos e convertendo para minúsculas
// Serve para comparar strings ignorando diferenças de acentos e case (maiúsc/minúsc)
function normalizeString(str: string) {
  return str
    .normalize("NFD")                   // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "")   // Remove os acentos
    .toLowerCase();                    // Transforma tudo em minúsculas
}

// Hook customizado que retorna o objeto com cor e nome formatado para um status
export function useStatusTheme(statusKey: string) {
  // Estado local para armazenar o status atual com cores e nome
  const [stats, setStats] = useState<StatusInfo | null>(null);

  // Normaliza o status recebido para facilitar a busca
  const normalizedSeat = normalizeString(statusKey);

  // Encontra a chave do StatusColor que corresponde ao status recebido, ignorando acento e case
  const normalize = Object.keys(StatusColor).find(
    (key) => normalizeString(key) === normalizedSeat
  ) || " ";  // Se não achar, deixa como string vazia

  // Efeito que roda sempre que o statusKey mudar para atualizar o estado 'stats'
  useEffect(() => {
    // Busca as cores e dados do status no objeto StatusColor pelo nome normalizado
    const status = StatusColor[normalize];

    // Se existir o status, atualiza o estado com as cores e o nome correto para exibir
    if (status) {
      setStats({
        cor: status.cor,
        colorBackground: status.colorBackground,
        nome: normalize,  // usa o nome formatado (ex: "Concluído")
      });
    }
  }, [normalize]);

  // Retorna o objeto com as cores e nome para ser usado no componente
  return stats;
}
