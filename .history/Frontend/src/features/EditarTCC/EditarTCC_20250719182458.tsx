import EditTCCForm from "./form/EditTCCForm";
import useAreaConhecimento from "@/hooks/useAreaConhecimento";
import useProfessores from "@/features/professor/hooks/useProfessores";
import EditTCCError from "./edit-tcc-error";
import EditTCCLoading from "./edit-tcc-loading";
import { useTCCContext } from "@/hooks/useTCCContext";

/**
 * Componente principal para editar um TCC existente.
 * Renderiza o formulário de edição de TCC com o logo e título.
 * @returns JSX.Element - Componente de edição de TCC.
 */

export default function EditTCC() {
  const { tccData, loading: loadingTCC } = useTCCContext();
  
  const {
    areasConhecimento,
    isLoading: loadingAreas,
    error: errorAreas,
  } = useAreaConhecimento();
  
  const {
    professores,
    isLoading: loadingProfessores,
    error: errorProfessores,
  } = useProfessores({
    disponibilidade: true,
  });

  console.log("TCC Data:", tccData);
  console.log("Áreas de Conhecimento:", areasConhecimento);
  console.log("Professores:", professores);

  // Verifica se há erros ao carregar áreas de conhecimento ou professores
  if (errorAreas || errorProfessores) return <EditTCCError />;

  // Verifica se os dados ainda estão sendo carregados
  if (loadingAreas || loadingProfessores || loadingTCC) return <EditTCCLoading />;

  // Verifica se há dados do TCC para editar
  if (!tccData) {
    return <EditTCCError message="TCC não encontrado para edição" />;
  }

  return (
    <>
      <div className="py-1">
        <h1 className="text-3xl text-center font-bold mb-2">Editar TCC</h1>
        <p className="text-center text-gray-600 font-semibold">
          Atualize as informações do seu trabalho de conclusão de curso!
        </p>
      </div>
      <EditTCCForm
        tccData={tccData}
        areasConhecimento={areasConhecimento || []}
        professores={professores || []}
      />
    </>
  );
}