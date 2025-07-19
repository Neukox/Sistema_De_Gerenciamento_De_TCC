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

        <div className="flex items-center justify-between h-[15%] bg-his p-4 rounded shadow-sm">

        </div>

        </div>
    </div>
  );
}
