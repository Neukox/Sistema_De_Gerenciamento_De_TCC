export function HistoricoAtividades() {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-historico">
      {/* Seção do título */}
      <div className="bg-historicoatividades w-[90%] h-[15%] mt-[5%] rounded-2xl p-4 relative">
        {/* Ícone */}
        <svg
          className="w-6 h-6 absolute top-4 left-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        {/* Título */}
        <h1 className="font-semibold text-3xl ml-12">Histórico de Atividades</h1>

        {/* Botão Exportar */}
        <button className="bg-white text-black absolute top-4 right-4 flex w-[9%] h-[45px] justify-center items-center gap-2 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
          Exportar
        </button>
      </div>

      {/* Seção de busca no histórico */}
      <div className="bg-historico w-[90%] h-[15%] mt-[2%] flex items-center justify-center rounded-2xl">
        {/* Conteúdo de busca aqui */}
        <span className="text-white text-xl">Buscar no histórico...</span>
      </div>
    </div>
  );
}
