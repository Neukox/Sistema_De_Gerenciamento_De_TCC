import { Card } from "@/components/ui/card";
import EditTCCForm from "./EditTCCForm";
import { useTCCContext } from "@/hooks/useTCCContext";

/**
 * Componente para editar informações do TCC
 * @returns Componente de edição do TCC
 */

export default function EditTCC() {
  const { editable } = useTCCContext();

  return (
    <>
      <Card className="p-6 shadow-md">
        <EditTCCForm
          professores={[]}
          areasConhecimento={[]}
          disabled={!editable}
          onSubmit={() => {
            console.log("Formulário enviado");
          }}
        />
      </Card>
    </>
  );
}
