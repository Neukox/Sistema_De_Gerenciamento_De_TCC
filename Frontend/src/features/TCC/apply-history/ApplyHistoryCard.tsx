import { cn } from "@/utils/cn";
import type { IconType } from "react-icons";
import { CgNotes } from "react-icons/cg";
import { GrTask } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import { LuGraduationCap, LuTarget } from "react-icons/lu";

const Icon = {
  TCC: LuGraduationCap,
  ATIVIDADE: GrTask,
  ANOTACAO: CgNotes,
  ETAPA_TCC: LuTarget,
  REUNIAO: IoPeopleSharp,
} satisfies Record<string, IconType>;

const actionColors = {
  CRIAR: { text: "text-green-600", bg: "bg-green-200" },
  ALTERAR: { text: "text-yellow-600", bg: "bg-yellow-200" },
  ATUALIZAR: { text: "text-blue-600", bg: "bg-blue-200" },
  EXCLUIR: { text: "text-red-600", bg: "bg-red-200" },
} satisfies Record<string, { text: string; bg: string }>;

export default function ApplyHistoryCard() {
  const IconEntity = Icon["ATIVIDADE"];
  const action = actionColors["EXCLUIR"];

  return (
    <div
      className={cn("flex items-center justify-between p-4 rounded shadow-sm", {
        [action.bg]: true,
      })}
    >
      <div className="flex items-center gap-4">
        <IconEntity className={cn("size-6", action.text)} />
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800">Tarefa Criada</h2>
          <p className="text-sm text-gray-700">
            Criou a tarefa 'Definição de metodologia'
          </p>
          <p className="text-sm text-gray-700">15/01/2024, 07:30</p>
        </div>
      </div>
    </div>
  );
}
