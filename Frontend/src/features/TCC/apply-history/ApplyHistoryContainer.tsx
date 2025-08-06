import ApplyHistoryCard from "./ApplyHistoryCard";
import type { HistoricoTCC } from "@/types/historico";
import ApplyHistoryLoading from "./ApplyHistoryLoading";

type ApplyHistoryContainerProps = {
  items?: HistoricoTCC[];
  loading?: boolean;
};

export default function ApplyHistoryContainer({
  items,
  loading = false,
}: ApplyHistoryContainerProps) {
  // Exibe o carregamento do histórico de aplicações
  if (loading) return <ApplyHistoryLoading />;

  return (
    <div className="w-full flex flex-col gap-6">
      {items?.map((item) => (
        <ApplyHistoryCard key={item.id} historico={item} />
      ))}
      {items?.length === 0 && (
        <div className="text-center text-gray-500 text-xl flex justify-center items-center h-80">
          Nenhuma atividade recente encontrada.
        </div>
      )}
    </div>
  );
}
