import Button from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/card";
import { Submit } from "@/components/ui/form";
import { useEditTCC } from "@/features/TCC/edit-tcc/edit-tcc";
import EditTCCLoading from "@/features/TCC/edit-tcc/EditTCCLoading";
import { useTCCContext } from "@/hooks/useTCCContext";
import useTitle from "@/hooks/useTitle";
import { GraduationCapIcon, Save } from "lucide-react";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";

const EditTCC = React.lazy(() => import("@/features/TCC/edit-tcc/EditTCC"));

/**
 * Página do TCC do Aluno
 * @returns Componente de página do TCC
 */

export default function MyTccPage() {
  useTitle("Meu TCC | FocoTCC");

  const { editable, setEditable } = useTCCContext();

  const { isPending } = useEditTCC();

  const openEditTCC = () => {
    setEditable(true);
  };

  const closeEditTCC = () => {
    setEditable(false);
  };

  useEffect(() => {
    return () => {
      if (!location.pathname.includes("/meu-tcc")) {
        setEditable(false);
      }
    };
  }, [location.pathname, setEditable]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <CardHeader className="p-0">
          <GraduationCapIcon className="text-primary size-8" />
          <h1 className="text-2xl font-semibold">Informações do TCC</h1>
        </CardHeader>
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {!editable && (
            <Button variant="primary" className="w-full" onClick={openEditTCC}>
              Editar TCC
            </Button>
          )}
          {editable && (
            <>
              <Button
                variant="default"
                onClick={closeEditTCC}
                className="flex items-center gap-2"
              >
                <CgClose className="size-6" />
                Cancelar Edição
              </Button>
              <Submit type="submit" form="edit-tcc-form" disabled={isPending}>
                {!isPending && <Save className="size-4" />}
                Salvar Alterações
              </Submit>
            </>
          )}
        </div>
      </Card>
      <Suspense fallback={<EditTCCLoading />}>
        <EditTCC />
      </Suspense>
    </div>
  );
}
