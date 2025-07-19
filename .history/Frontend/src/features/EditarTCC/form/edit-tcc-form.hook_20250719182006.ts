import editTCCFormSchema, {
  type EditTCCFormData,
} from "./edit-tcc-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TCCData } from "@/types/tcc";

/**
 * Hook para gerenciar o formulário de edição de TCC.
 * Utiliza a biblioteca react-hook-form para gerenciamento de formulários e zod para validação.
 * Pré-preenche os campos com os dados existentes do TCC.
 */
export default function useEditTCCForm(tccData: TCCData) {
  // Função para formatar datas para o input date
  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const form = useForm<EditTCCFormData>({
    resolver: zodResolver(editTCCFormSchema),
    defaultValues: {
      titulo: tccData.title || "",
      tema: "", // Campo não existe no TCCData atual, deixar vazio para preenchimento
      areaConhecimento: "", // Campo não existe no TCCData atual, deixar vazio para preenchimento  
      orientador: tccData.orientador || "",
      coorientador: tccData.coorientador || "",
      resumo: "", // Campo não existe no TCCData atual, deixar vazio para preenchimento
      dataInicio: formatDateForInput(tccData.data_inicio),
      dataConclusao: formatDateForInput(tccData.prazo_entrega),
      status: "PLANEJAMENTO", // Usar valor padrão pois o campo status no TCCData tem estrutura diferente
    },
  });

  return {
    ...form,
  };
}
