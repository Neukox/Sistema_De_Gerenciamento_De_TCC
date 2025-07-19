import logo from "@/assets/logo.png";

interface EditTCCErrorProps {
  message?: string;
}

/**
 * Componente de erro para a edição de TCC.
 * Exibe uma mensagem de erro quando há problemas ao carregar dados necessários.
 * @returns JSX.Element - Componente de erro.
 */

export default function EditTCCError({ message = "Erro ao carregar dados necessários para edição" }: EditTCCErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <h1 className="text-2xl font-bold text-gray-800">FocoTCC</h1>
        <div className="text-red-500 text-xl">⚠️</div>
        <h2 className="text-xl font-semibold text-red-600">Erro</h2>
        <p className="text-gray-600">
          {message}. Tente novamente mais tarde.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
