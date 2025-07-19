//Layout de historico de atividades.

export function HistoricoAtividades() {
  return (
    <div className="flex items-center justify-center h-screen bg-historico">
      <div className="bg-historicoatividades w-screen h-[15%] m-[3%] rounded-2xl -mt-[35%]">
        <div>
          <svg
            className="flex w-[2%] h-[2%] mt-[3%] ml-[3%]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h1 className="font-semibold text-3xl ml-[5.5%] -mt-[2%]">
            Histórico de Atividades
          </h1>
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

            {/** Buscar no Histórico*/}
        <div className="flex items-center justify-center mt-[50%] bg-historico w-screen h-[15%]">

        </div>

          </div>

        </div>

        
      </div>
    </div>
  );
}
