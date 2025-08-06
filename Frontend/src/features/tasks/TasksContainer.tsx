import { useTccTasks } from "./hooks/tcc-tasks.hook";
import TaskCard from "./TaskCard";
import TasksLoading from "./TasksLoading";

export default function TasksContainer({ tccId }: { tccId: number }) {
  const { data, isLoading, error } = useTccTasks(tccId);

  // Exibe o carregamento das tarefas
  if (isLoading) return <TasksLoading />;

  return (
    <div className="flex flex-col gap-4">
      {data?.atividades.map((task) => (
        <TaskCard key={task.id} task={task} mostrarEditar={true} />
      ))}
      {data?.atividades.length === 0 ||
        (error?.status === 404 && (
          <div className="flex items-center justify-center h-60 text-gray-600">
            <p>Nenhuma tarefa cadastrada.</p>
          </div>
        ))}
    </div>
  );
}
