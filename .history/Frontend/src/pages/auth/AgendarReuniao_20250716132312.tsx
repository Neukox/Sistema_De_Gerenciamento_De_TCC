import logo from "../../assets/logo.png";
import { Input } from "@/components/ui/form";


export function AgendarReuniao() {
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-xl">
        {/* Logo e título */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <img src={logo} alt="Logo" className="w-16" />
          <h1 className="text-2xl sm:text-3xl font-semibold">FocoTCC</h1>
        </div>

        {/* Título do formulário */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold">Agendar Nova Reunião</h2>
          <p className="text-sm sm:text-lg mt-2 sm:mt-4 text-gray-600">
            Preencha os detalhes da sua reunião
          </p>
        </div>

        {/* Formulário */}
        <form>
          {/* Título */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="titulo">
              Título da Reunião
            </label>
            <Input
              id="titulo"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Reunião de Orientação"
            />
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="descricao">
              Descrição da Reunião
            </label>
            <textarea
              id="descricao"
              className="px-3 w-[100%] py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
              placeholder="Descreva o objetivo da reunião"
            ></textarea>
          </div>

          {/* Data e Hora */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="data">
                Data da Reunião
              </label>
              <input
                id="data"
                type="date"
                className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="hora">
                Hora da Reunião
              </label>
              <input
                id="hora"
                type="time"
                className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Participantes */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="participantes">
              Participantes
            </label>
            <input
              id="participantes"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Nome dos participantes"
            />
          </div>

          {/* Local/Plataforma */}
          <div className="mb-10">
            <label className="block text-base sm:text-lg font-medium mb-1 ml-1" htmlFor="local">
              Local/Plataforma
            </label>
            <input
              id="local"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Zoom, Google Meet, Sala 101"
            />
          </div>

         {/* Botão */}
<div className="flex justify-center md:justify-end">
  <button
    type="submit"
    className="flex items-center gap-2 px-6 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    Agendar Reunião
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
