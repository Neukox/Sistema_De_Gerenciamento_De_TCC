import useCreateTask from "./create-task.hook";
import TaskForm from "../form/TaskForm";
import type { TaskFormData } from "../form/task-form.schema";
import { useTCCContext } from "@/hooks/useTCCContext";
import { useLocation, useNavigate } from "react-router-dom";
import useModal from "@/context/modal/useModal";

/**
 * Componente para criar uma nova tarefa.
 * Utiliza o hook useCreateTask para gerenciar a criação da tarefa.
 * @returns Componente de criação de tarefa
 */
export default function CreateTask() {
  const { mutate: createTask, isPending, isSuccess } = useCreateTask();

  const { tccData } = useTCCContext();

  const { closeModal } = useModal();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (data: TaskFormData) => {
    createTask({
      ...data,
      nome: data.titulo,
      dataEntrega: data.data_conclusao,
      tccId: tccData?.id,
    });
  };

  if (isSuccess) {
    closeModal();
    
    if (location.pathname !== "/tarefas") {
      navigate("/tarefas");
    }
  }

  return <TaskForm onSubmit={handleSubmit} isSubmitting={isPending} />;
}
