import TasksLayout from "@/features/tasks/TasksLayout";
import useTitle from "@/hooks/useTitle";

/**
 * Página de Tarefas do TCC
 * @returns Componente de página de tarefas
 */

export default function TasksPage() {
  useTitle("Tarefas | Foco TCC");

  return (
    <div className="bg-secondary min-h-screen p-4 flex">
      <TasksLayout />
    </div>
  );
}
