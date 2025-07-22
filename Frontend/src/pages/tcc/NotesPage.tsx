import NotesLayout from "@/features/notes/NotesLayout";
import useTitle from "@/hooks/useTitle";

/**
 * Página de Anotações do TCC
 * @returns Componente de página de anotações
 */

export default function NotesPage() {
  useTitle("Anotações | Foco TCC");

  return (
    <div className="flex">
      <NotesLayout />
    </div>
  );
}
