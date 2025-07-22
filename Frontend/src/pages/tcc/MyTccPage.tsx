import Button from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/card";
import { Submit } from "@/components/ui/form";
import EditTCC from "@/features/TCC/edit-tcc/EditTCC";
import { useTCCContext } from "@/hooks/useTCCContext";
import useTitle from "@/hooks/useTitle";
import { GraduationCapIcon, Save } from "lucide-react";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";

/**
 * Página do TCC do Aluno
 * @returns Componente de página do TCC
 */

export default function MyTccPage() {
  useTitle("Meu TCC | FocoTCC");

  const { editable, setEditable } = useTCCContext();

  const handleEditTCC = () => {
    setEditable((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      setEditable(false); // Reseta o estado de edição ao desmontar o componente
    };
  }, [setEditable]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <CardHeader className="p-0">
          <GraduationCapIcon className="text-primary size-8" />
          <h1 className="text-2xl font-semibold">Informações do TCC</h1>
        </CardHeader>
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {!editable && (
            <Button
              variant="primary"
              className="w-full"
              onClick={handleEditTCC}
            >
              Editar TCC
            </Button>
          )}
          {editable && (
            <>
              <Button
                variant="default"
                onClick={handleEditTCC}
                className="flex items-center gap-2"
              >
                <CgClose className="size-6" />
                Cancelar Edição
              </Button>
              <Submit form="edit-tcc-form">
                <Save className="size-6" />
                Salvar Alterações
              </Submit>
            </>
          )}
        </div>
      </Card>
      <EditTCC />
    </div>
  );
}
