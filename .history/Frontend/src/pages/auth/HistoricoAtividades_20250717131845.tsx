// Layout de histórico de atividades

export function HistoricoAtividades() {
  return (
    <div className="flex items-center justify-center h-screen bg-historico">
      {/* Card principal */}
      <div className="bg-historicoatividades w-screen h-[15%] m-[3%] rounded-2xl -mt-[35%]">
        {/* Ícone do relógio */}
        <svg
          className="w-[2%] h-[2%] mt-[3%] ml-[3%]"
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
        <h1 className="font-semibold text-3xl ml-[5.5%] -mt-[2%]">
          Histórico de Atividades
        </h1>

        {/* Botão Exportar */}
        <div>
          <button className="bg-white text-black ml-[85%] -mt-[2.5%] flex w-[9%] h-[45px] justify-center items-center gap-2 rounded">
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

        {/* Área para buscar no histórico */}
        <div className="flex   mt-[30%] bg-historico w-screen h-[15%]">
          {/* Conteúdo de busca aqui futuramente */}
        </div>
      </div>
    </div>
  );
}
