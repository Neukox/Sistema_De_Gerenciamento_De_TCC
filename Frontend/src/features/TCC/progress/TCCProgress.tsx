import ProgressBar from "@/components/common/ProgressBar";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { PresentationIcon, Target } from "lucide-react";
import { CgNotes } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { IoMdPeople, IoMdTrendingUp } from "react-icons/io";

type TCCProgressProps = {
  className?: string;
};

export default function TCCProgress({ className }: TCCProgressProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-7xl bg-neutral flex flex-col gap-8 rounded-lg shadow-lg p-6",
        className
      )}
    >
      <CardHeader className="gap-2 p-0">
        <IoMdTrendingUp className="size-6" />
        <h2 className="text-2xl font-semibold">Progresso Detalhado</h2>
      </CardHeader>
      <div className="flex flex-col gap-6">
        <ProgressBar
          title="Marcos"
          progress={0}
          icon={() => <Target className="text-green-500 size-5" />}
        >
          <span className="text-sm text-gray-500">
            0 de 0 marcos concluídos
          </span>
        </ProgressBar>
        <ProgressBar
          title="Tarefas"
          progress={0}
          icon={() => <FaTasks className="text-blue-500" />}
        >
          <span className="text-sm text-gray-500">
            0 de 0 tarefas concluídas
          </span>
        </ProgressBar>
        <ProgressBar
          title="Anotações"
          progress={0}
          icon={() => <CgNotes className="text-orange-500" />}
        >
          <span className="text-sm text-gray-500">
            0 de 10 anotações criadas
          </span>
        </ProgressBar>
        <ProgressBar
          title="Reuniões"
          progress={0}
          icon={() => <IoMdPeople className="text-violet-500" />}
        >
          <span className="text-sm text-gray-500">0 de 0 anotações feitas</span>
        </ProgressBar>
        <ProgressBar
          title="Defesas"
          progress={0}
          icon={() => <PresentationIcon className="text-red-500 size-4" />}
        >
          <span className="text-sm text-gray-500">
            Defesas pré-banca e final realizadas
          </span>
        </ProgressBar>
      </div>
    </Card>
  );
}
