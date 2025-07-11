import { useState, useEffect } from "react";

  // Define corretamente o tipo do objeto que vamos usar
 interface StatusInfo {
  cor: string;
  colorBackground: string;
  nome: string;
  }
 const StatusColor: Record<string,  { cor: string; colorBackground: string }> = {
    Planejamento: { cor: '#4FC3F7', colorBackground: '#dceafe'},
    Desenvolvimento: { cor: '#1976D2', colorBackground: '#BBDEFB'},
    Revisão: {cor: '#908852', colorBackground: '#FBEB93' },
    Finalização: { cor: '#853717', colorBackground: '#FFE0B2' },
    Concluído: { cor: '#4CAF50', colorBackground: '#C8E6C9'},
    Pendente: {cor: '#878787', colorBackground: '#E0E0E0'},
    Atrasado: {cor:'#5C4141', colorBackground: '#FFCDD2'},
  };

  // Esse hook retorna a cor e o nome de um status específico
export function useStatusTheme() {
  // Mapeamento entre o nome do status e a cor
 
  // Estado que guarda o status atual
  const [stats, setStats] = useState<StatusInfo | null>(null);

  useEffect(() => {
    const key = 'Atrasado'; // depois você pode deixar isso dinâmico
const status = StatusColor[key];
    if (status) {
      setStats({
        cor: status.cor,
        colorBackground: status.colorBackground,
        nome: key,
      });
    }
  }, []);

  return stats;
}
