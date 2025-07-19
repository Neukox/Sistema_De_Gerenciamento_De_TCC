import { useEffect, useState } from "react";

interface Cronograma {
  dataInicio?: string | null;
  dataEntrega?: string | null;
}

const ano = new Date().getFullYear();
const mes = new Date().getMonth();
const dia = new Date().getDate();

export function useCronograma({ dataInicio, dataEntrega }: Cronograma) {
  const [diasRestantes, setDiasRestantes] = useState<number | null>(0);

  useEffect(() => {
    if (!dataInicio || !dataEntrega || dataInicio === '-' || dataEntrega === '-') {
      setDiasRestantes(null);
      return;
    }

    try {
      const inicio = new Date(dataInicio);
      const entrega = new Date(dataEntrega);

      // Verificar se ambas as datas são válidas
      if (isNaN(inicio.getTime()) || isNaN(entrega.getTime())) {
        setDiasRestantes(null);
        return;
      }

      // Converter para UTC e zerar horas para comparar só dias
      const inicioUTC = new Date(Date.UTC(ano, mes, dia));
      const entregaUTC = new Date(Date.UTC(ano, mes, dia));

      const diferencaMs = entregaUTC.getTime() - inicioUTC.getTime();
      const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

      setDiasRestantes(dias);
    } catch (error) {
      console.error('Erro ao calcular dias restantes:', error);
      setDiasRestantes(null);
    }


    
  }, [dataInicio, dataEntrega]);

  return diasRestantes;
}
