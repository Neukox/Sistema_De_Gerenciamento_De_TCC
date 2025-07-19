import logo from "@/assets/logo.png";

/**
 * Componente de loading para a edição de TCC.
 * Exibe um indicador de carregamento enquanto os dados estão sendo carregados.
 * @returns JSX.Element - Componente de loading.
 */

export default function EditTCCLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <h1 className="text-2xl font-bold text-gray-800">FocoTCC</h1>
        
        {/* Spinner de loading */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        
        <h2 className="text-xl font-semibold text-gray-700">Carregando...</h2>
        <p className="text-gray-600">
          Carregando dados do TCC para edição. Aguarde um momento.
        </p>
      </div>
    </div>
  );
}
