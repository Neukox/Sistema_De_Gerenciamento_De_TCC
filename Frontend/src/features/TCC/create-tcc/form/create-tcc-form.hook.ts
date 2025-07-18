import createTCCFormSchema, {
  type CreateTCCFormData,
} from "./create-tcc-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Hook para gerenciar o formulário de criação de TCC.
 * Utiliza a biblioteca react-hook-form para gerenciamento de formulários e zod para validação.
 */
export default function useCreateTCCForm() {
  const form = useForm<CreateTCCFormData>({
    resolver: zodResolver(createTCCFormSchema),
    defaultValues: {
      status: "PLANEJAMENTO",
    },
  });

  return {
    ...form,
  };
}
