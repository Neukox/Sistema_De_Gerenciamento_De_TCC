import CreateTCCForm from "./form/CreateTCCForm";
import useAreaConhecimento from "@/hooks/useAreaConhecimento";
import useProfessores from "@/features/professor/hooks/useProfessores";
import CreateTCCError from "./CreateTCCError";
import CreateTCCLoading from "./CreateTCCLoading";

/**
 * Componente principal para criar um novo TCC.
 * Renderiza o formulário de criação de TCC com o logo e título.
 * @returns JSX.Element - Componente de criação de TCC.
 */

export default function CreateTCC() {
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

  console.log("Áreas de Conhecimento:", areasConhecimento);
  console.log("Professores:", professores);

  // Verifica se há erros ao carregar áreas de conhecimento ou professores
  if (errorAreas || errorProfessores) return <CreateTCCError />;

  console.error(
    "Erro ao carregar áreas de conhecimento ou professores:",
    errorAreas,
    errorProfessores
  );

  // Verifica se os dados ainda estão sendo carregados
  if (loadingAreas || loadingProfessores) return <CreateTCCLoading />;

  return (
    <>
      <div className="py-1">
        <h1 className="text-3xl text-center font-bold mb-2">Cadastrar TCC</h1>
        <p className="text-center text-gray-600 font-semibold">
          Registre seu trabalho de conclusão de curso!
        </p>
      </div>
      <CreateTCCForm
        areasConhecimento={areasConhecimento || []}
        professores={professores || []}
      />
    </>
  );
}
