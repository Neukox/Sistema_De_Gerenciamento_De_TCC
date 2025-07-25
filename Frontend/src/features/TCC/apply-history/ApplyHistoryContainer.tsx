import type { HistoricoTCC } from "@/types/historico";
import ApplyHistoryCard from "./ApplyHistoryCard";

type ApplyHistoryContainerProps = {
  data: HistoricoTCC[];
};

export default function ApplyHistoryContainer({
  data,
}: ApplyHistoryContainerProps) {
  return (
    <div className="flex flex-col gap-6">
      {data.map((item) => (
        <ApplyHistoryCard key={item.id} historico={item} />
      ))}
      {data.length === 0 && (
        <div className="text-center text-gray-500 text-xl flex justify-center items-center h-80">
          Nenhuma atividade recente encontrada.
        </div>
      )}
    </div>
  );
}
