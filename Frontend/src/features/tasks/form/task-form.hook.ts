import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema, type TaskFormData } from "./task-form.schema";

/**
 * Hook para gerenciar o formulário de tarefas do TCC.
 * Utiliza react-hook-form com validação Zod.
 * @returns {object} Objeto contendo métodos e propriedades do formulário.
 */
export function useTaskForm(initialValues?: Partial<TaskFormData>) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  return {
    ...form,
  };
}
