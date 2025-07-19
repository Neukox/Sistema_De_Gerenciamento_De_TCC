export function HistoricoAtividades() {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-historico px-6 py-8 gap-4">
      {/* Seção do Título + Exportar */}
      <div className="bg-historicoatividades w-full max-w-6xl p-6 rounded-2xl flex items-center justify-between">
        {/* Título + Ícone */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-black"
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
          <h1 className="font-semibold text-2xl">Histórico de Atividades</h1>
        </div>

        {/* Botão Exportar */}
        <button className="bg-white text-black flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
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

      {/* Seção de busca */}
      <div className="bg-historicoatividades w-full max-w-6xl p-4 rounded-2xl flex items-center gap-4">
        {/* Campo de texto */}
        <div className="flex items-center w-[70%] bg-white text-gray-500 rounded px-4 py-2 shadow-sm gap-2">
          <svg
            className="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar no histórico..."
            className="w-full outline-none text-black placeholder-gray-400"
          />
        </div>

        {/* Options de seletores */}
        <select
          className="bg-white text-black px-4 py-2 rounded border border-gray-300 shadow-sm"
          defaultValue=""
        >
          <option value="">Todos os tipos</option>
          <option value="tarefas">Tarefas</option>
          <option value="sistema">Sistema</option>
        </select>
        <select
          className="bg-white text-black px-4 py-2 rounded border border-gray-300 shadow-sm"
          defaultValue=""
        >
          <option value="">Todas as datas</option>
          <option value="hoje">Hoje</option>
          <option value="ultima_semana">Última semana</option>
          <option value="ultimo_mes">Último mês</option>
        </select>
      </div>

      {/* Seção de Atividades */}
      <div className="bg-historicoatividades w-full h-full max-w-6xl p-6 rounded-2xl flex flex-col gap-4">
        <div>
          <h1 className="flex font-semibold ml-3 text-2xl">
            Atividades Recentes
          </h1>
        </div>

        <div className="flex items-center justify-between h-[25%] bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-2 -mt-[5%]">
            <svg
              className="w-6 h-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            <h2 className="font-semibold text-gray-800">Tarefa Criada</h2>

            <svg
              className="w-6 h-6 text-blue-400 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Criou a tarefa "Desenvolvimento de introdução do TCC."</p>
            <p>Data: 12/03/2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
