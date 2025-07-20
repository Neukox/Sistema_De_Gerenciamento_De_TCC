import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { useNotes } from "@/hooks/Notes";
import { FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";

/**
 * Componente de layout para Anotações
 * @returns Componente de layout de anotações
 */

export default function NotesLayout() {
    const {
    notaAtual,
    setNotaAtual,
    listaNota,
    salvarNota,
    erroNota,
    removerNota,
  } = useNotes();

  return (
    <Card className="flex flex-col w-full bg-neutral rounded-lg shadow-lg p-6">
      <div className="flex flex-row mb-4">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-4xl">
            <IoCalendarClearOutline className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            <span>Anotações e Observações</span>
          </h1>
          <h4 className="text-gray-500 mt-1 text-sm sm:text-base">
            Registre aqui suas anotações e observações rápidas sobre o TCC
          </h4>
        </div>
      </div>
      {/* Área de texto */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <textarea
            value={notaAtual}
            onChange={(e) => setNotaAtual(e.target.value)}
            placeholder="Adicione suas anotações..."
            className="p-3 sm:p-4 w-full h-32 sm:h-44 mt-4 bg-gray-300 rounded-sm font-sans font-normal text-black border-gray-100 focus:outline-none text-sm sm:text-base"
          />
          <Button
            variant="primary"
            onClick={() => salvarNota(notaAtual)}
            className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 h-10 sm:h-12 w-full sm:w-auto max-w-xs mt-4 text-sm sm:text-base"
          >
            <FaPlus size={16} className="sm:hidden" />
            <FaPlus size={20} className="hidden sm:block" />
            Adicionar Anotações
          </Button>
          {/* impede de adicionar notas vazias */}
          {erroNota && (
            <span className="text-red-500 text-xs sm:text-sm mt-4">
              {erroNota}
            </span>
          )}
        </div>
        {/* Se não houver notas, exibe mensagem */}
        <div className="mt-4 overflow-y-visible">
          {listaNota.length === 0 ? (
            <p className="text-gray-400 flex items-center mt-8 justify-center text-sm sm:text-base">
              Nenhuma anotação cadastrada.
            </p>
          ) : (
            /* Mapeia e renderiza cada nota da lista */
            listaNota.map((nota, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6"
              >
                <div className="bg-gray-200 min-h-[100px] sm:h-32 flex justify-between p-3 sm:px-4 sm:py-4 rounded-md shadow-sm">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col flex-1 mr-2">
                      <p className="whitespace-pre-wrap break-words font-semibold text-gray-800 text-sm sm:text-base">
                        • {nota.texto}
                      </p>
                      <span className="text-xs sm:text-sm text-gray-600 mt-auto pt-2 border-t">
                        {nota.data}
                      </span>
                    </div>
                    <Button
                      variant="edit"
                      onClick={() => {
                        removerNota(nota.id);
                      }}
                      className="h-8 w-8 sm:h-10 sm:w-10 p-1"
                    >
                      <FaTrashCan size={16} className="sm:hidden" />
                      <FaTrashCan size={20} className="hidden sm:block" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
