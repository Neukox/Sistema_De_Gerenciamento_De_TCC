import type { ReuniaoWithTCC } from "@/types/reuniao";
import formatDate from "@/utils/format-date";

type MeetingCardProps = {
  data: ReuniaoWithTCC;
};

export default function MeetingCard({ data }: MeetingCardProps) {
  return (
    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 shadow">
      <h3 className="font-semibold text-lg text-gray-900">
        {data.tcc?.titulo ?? "Reunião sem título"}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {data.descricao ?? "Sem descrição"}
      </p>
      <p className="text-sm mt-2">
        <span className="font-semibold">Data e Hora:</span>{" "}
        {formatDate(data.data_agendada) ?? "Data não informada"}
      </p>
      <p className="text-sm mt-1">
        <span className="font-semibold">Observações:</span> {data.observacoes}
      </p>
    </div>
  );
}
