import { Card, CardHeader } from "@/components/ui/card";
import { useCronograma } from "@/hooks/useCronograma";
import { useStatusTheme } from "@/hooks/useStatusTheme";
import { useTCCContext } from "@/hooks/useTCCContext";
import { Calendar } from "lucide-react";

export default function TCCTimeline() {
  const { tccData } = useTCCContext();
  // Datas do cronograma
  const dataInicio = tccData?.data_inicio ?? null;
  const dataEntrega = tccData?.prazo_entrega ?? null;

  // Cálculos
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });
  const prazoAtrasado = diasRestantes !== null && diasRestantes < 0;
  const statusKey = prazoAtrasado ? "Atrasado" : tccData?.status ?? " ";
  const status = useStatusTheme(statusKey);

  return (
    <Card className="flex flex-col gap-6 min-h-60 p-6">
      <CardHeader className="gap-2 p-0">
        <Calendar className="size-6" />
        <h2 className="text-xl font-semibold">Cronograma do TCC</h2>
      </CardHeader>
      {/* Datas */}
      <div className="flex flex-col text-base text-gray-500 gap-4">
        <div className="flex justify-between">
          <span>Data de início:</span>
          <span className="text-gray-900 font-semibold">
            {dataInicio !== null ? dataInicio : "--/--/----"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Data de entrega:</span>
          <span className="text-gray-900 font-semibold">
            {dataEntrega !== null ? dataEntrega : "--/--/----"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Dias restantes:</span>
          <span className="text-gray-900 font-semibold">
            {diasRestantes !== null ? diasRestantes : "—"}
          </span>
        </div>
      </div>
      {/* Status */}
      {status && (
        <span
          className="text-lg font-bold rounded-lg text-center p-2 sm:p-1 flex justify-center items-center min-h-[2rem] sm:min-h-[2.5rem]"
          style={{
            color: status.cor,
            backgroundColor: status.colorBackground,
          }}
        >
          {status.nome}
        </span>
      )}
    </Card>
  );
}
