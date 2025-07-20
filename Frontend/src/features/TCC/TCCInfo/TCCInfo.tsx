import ProgressBar from "@/components/common/ProgressBar";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function TCCInfo() {
  return (
    <Card className="w-full max-w-7xl bg-neutral flex flex-col rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap className="inline size-6 text-primary" />
          Trabalho de Conclusão de Curso
        </span>
        <h2 className="text-xl font-bold">Nenhum TCC Cadastrado</h2>
        <div className="flex flex-row flex-wrap gap-4 justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500">Orientador:</span>
            <span className="text-gray-700">Nenhum orientador atribuído</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Coorientador:</span>
            <span className="text-gray-700">Nenhum coorientador atribuído</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Área de conhecimento:</span>
            <span className="text-gray-700">Nenhuma área definida</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar title="Progresso do TCC" progress={65}>
          <span className="text-sm text-gray-500">
            Projeto iniciado em --/--/---- e previsto para conclusão em
            --/--/----.
          </span>
        </ProgressBar>
      </div>
    </Card>
  );
}
