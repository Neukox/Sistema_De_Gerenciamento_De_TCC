import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import TaskCard from "./TaskCard";
import { useTccTasks } from "./hooks/tcc-tasks.hook";

export default function TasksLayout({ tccId }: { tccId: number }) {
  const { data, error } = useTccTasks(tccId);

  return (
    <Card className="flex flex-col flex-1 gap-8 w-full shadow-lg p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <GrTask className="size-10" />
          <div>
            <h1 className="font-bold text-3xl">Listas de Tarefas</h1>
            <p className="text-gray-500">Gerencie suas tarefas do seu TCC</p>
          </div>
        </div>
        <Button
          variant="primary"
          className="flex items-center justify-center gap-2"
        >
          <FaPlus className="size-4" />
          Nova Tarefa
        </Button>
      </div>
      {data?.atividades.length === 0 ||
        (error && (
          <p className="text-gray-400 flex items-center mt-12 justify-center text-sm sm:text-base">
            Nenhuma tarefa cadastrada.
          </p>
        ))}
      {data?.atividades &&
        data.atividades.map((task) => (
          <TaskCard key={task.id} task={task} mostrarEditar={true} />
        ))}
    </Card>
  );
}
