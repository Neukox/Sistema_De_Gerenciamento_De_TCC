import MarksCard from "@/components/card/MarksCard";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { useCard } from "@/hooks/useCard";
import { FaPlus } from "react-icons/fa";
import { GrTask } from "react-icons/gr";

export default function TasksLayout() {
  // Dados das listas
  const { tarefas } = useCard();

  return (
    <Card className="flex flex-col flex-1 w-full shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 sm:gap-3 font-bold text-3xl">
            <GrTask className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            <span>Listas de Tarefas</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Gerencie suas tarefas do seu TCC
          </p>
        </div>
        <Button
          variant="primary"
          className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto"
        >
          <FaPlus size={16} className="sm:hidden" />
          <FaPlus size={20} className="hidden sm:block" />
          Nova Tarefa
        </Button>
      </div>
      {tarefas.length === 0 ? (
        <p className="text-gray-400 flex items-center mt-12 justify-center text-sm sm:text-base">
          Nenhuma tarefa cadastrada.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-5 w-full">
          {tarefas.map((tarefa) => (
            <MarksCard
              key={tarefa.id}
              id={tarefa.id}
              title={tarefa.title}
              description={tarefa.description}
              prazo={tarefa.prazo}
              stats={tarefa.stats}
              mostrar={false}
              mostrarEditar={true}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
