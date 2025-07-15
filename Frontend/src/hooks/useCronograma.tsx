import { useEffect, useState } from "react";

interface Cronograma {
  dataInicio?: string | null;
  dataEntrega?: string | null;
}

function criarDataLocal(dataStr: string): Date {
  const [ano, mes, dia] = dataStr.split("-").map(Number);
  return new Date(ano, mes - 1, dia); // mês é zero-indexado
}

export function useCronograma({ dataInicio, dataEntrega }: Cronograma) {
  const [diasRestantes, setDiasRestantes] = useState<number | null>(0);

  useEffect(() => {
    if (!dataInicio || !dataEntrega) {
      setDiasRestantes(null);
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias
    const entrega = criarDataLocal(dataEntrega);

    // zerar horas para comparar só dias
    hoje.setHours(0, 0, 0, 0);
    entrega.setHours(0, 0, 0, 0);

    const diferencaMs = entrega.getTime() - hoje.getTime();
    const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    setDiasRestantes(dias);


    
  }, [dataInicio, dataEntrega]);

  return diasRestantes;
}
