import { useMemo } from "react";

/**
 * Hook para calcular os dias restantes entre duas datas
 * @param {Date | string} dataInicio - Data de início do cronograma
 * @param {Date | string} dataEntrega - Data de entrega do cronograma
 * @returns {number | null} - Dias restantes ou null se as datas forem inválidas
 */

export function useCronograma(
  dataInicio: Date | string,
  dataEntrega: Date | string
) {
  const diasRestantes = useMemo(() => {
    if (
      !dataInicio ||
      !dataEntrega ||
      dataInicio === "-" ||
      dataEntrega === "-"
    ) {
      return null;
    }

    const inicio = new Date(dataInicio);
    const entrega = new Date(dataEntrega);

    // Verificar se ambas as datas são válidas
    if (isNaN(inicio.getTime()) || isNaN(entrega.getTime())) {
      return null;
    }

    inicio.setHours(0, 0, 0, 0);
    entrega.setHours(0, 0, 0, 0);

    const diferencaMs = entrega.getTime() - inicio.getTime();
    return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
  }, [dataInicio, dataEntrega]);

  return diasRestantes;
}
