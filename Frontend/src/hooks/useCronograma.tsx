import { useEffect, useState } from "react";

interface Cronograma {
  dataInicio?: string | null;
  dataEntrega?: string | null;
}

export function useCronograma({ dataInicio, dataEntrega }: Cronograma) {
  const [diasRestantes, setDiasRestantes] = useState<number | null>(0);

  useEffect(() => {
    if (!dataInicio || !dataEntrega) {
      setDiasRestantes(null);
      return;
    }

    const hoje = new Date();
    const entrega = new Date(dataEntrega);

    // zerar horas para comparar só dias
    hoje.setHours(0, 0, 0, 0);
    entrega.setHours(0, 0, 0, 0);

    const diferencaMs = entrega.getTime() - hoje.getTime();
    const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    setDiasRestantes(dias);


    
  }, [dataInicio, dataEntrega]);

  return diasRestantes;
}
