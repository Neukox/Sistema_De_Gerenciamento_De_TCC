import { HistoricoAtividades } from "@/features/TCC/apply-history/ApplyHistory";
import useTitle from "@/hooks/useTitle";

export default function ApplyHistoryPage() {
  useTitle("Histórico de Ações do TCC | Foco TCC");

  return (
    <div className="flex flex-col -center gap-6 w-full max-w-8xl">
      <HistoricoAtividades />
    </div>
  );
}