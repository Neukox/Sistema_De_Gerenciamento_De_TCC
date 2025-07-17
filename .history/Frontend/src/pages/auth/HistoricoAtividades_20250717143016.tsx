export function HistoricoAtividades() {
  return (
    <div className="flex flex-col items-center justify-start h-[1500px] bg-historico px-6 py-8 gap-4">
      
      {/* Cabeçalho: Título + Botão Exportar */}
      <div className="bg-historicoatividades w-full max-w-6xl p-6 rounded-2xl flex items-center justify-between">
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

      {/* Barra de Busca + Filtros */}
      <div className="bg-historicoatividades w-full max-w-6xl p-4 rounded-2xl flex items-center gap-4">
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

      {/* Seção de Atividades Recentes */}
      <div className="bg-historicoatividades w-full h-full max-w-6xl p-6 rounded-2xl flex flex-col gap-6">

        <h1 className="flex font-semibold ml-3 text-2xl">Atividades Recentes</h1>

        {/* Item 1: Tarefa Criada */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone task */}
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
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Tarefa Criada</h2>
              <p className="text-sm text-gray-600">Criou a tarefa 'Definição de metodologia'</p>
              <p className="text-sm text-gray-600">15/01/2024, 07:30</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 2: Marco Atingido */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone milestone */}
            <svg
              className="w-6 h-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Marco Atingido</h2>
              <p className="text-sm text-gray-600">Completou o marco 'Revisão Bibliográfica'</p>
              <p className="text-sm text-gray-600">14/01/2024, 13:45</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 3: Perfil Atualizado */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone profile */}
            <svg
              className="w-6 h-6 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20c0-2.21 3.58-4 6-4s6 1.79 6 4v1H6v-1z"
              />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Perfil Atualizado</h2>
              <p className="text-sm text-gray-600">Atualizou informações do perfil</p>
              <p className="text-sm text-gray-600">14/01/2024, 06:15</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 4: Nota Adicionada */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone note */}
            <svg
              className="w-6 h-6 text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Nota Adicionada</h2>
              <p className="text-sm text-gray-600">Adicionou nota sobre 'Metodologia de Pesquisa'</p>
              <p className="text-sm text-gray-600">13/01/2024, 11:20</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 5: Configuração Alterada */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone system */}
            <svg
              className="w-6 h-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Configuração Alterada</h2>
              <p className="text-sm text-gray-600">Ativou notificações por email</p>
              <p className="text-sm text-gray-600">13/01/2024, 08:00</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 6: Tarefa Atualizada */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone task */}
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
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Tarefa Atualizada</h2>
              <p className="text-sm text-gray-600">Atualizou a tarefa 'Cronograma'</p>
              <p className="text-sm text-gray-600">12/01/2024, 16:45</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 7: Reunião Agendada */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone calendar */}
            <svg
              className="w-6 h-6 text-pink-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Reunião Agendada</h2>
              <p className="text-sm text-gray-600">Agendou reunião para a defesa</p>
              <p className="text-sm text-gray-600">11/01/2024, 09:00</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Item 8: Documento Enviado */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
            {/* Ícone upload */}
            <svg
              className="w-6 h-6 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m0 0-4-4m4 4 4-4"
              />
            </svg>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-800">Documento Enviado</h2>
              <p className="text-sm text-gray-600">Enviou o documento final do TCC</p>
              <p className="text-sm text-gray-600">10/01/2024, 18:30</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* ícones extras completed (maior) */}
            <svg
              className="w-10 h-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Resumo Geral (4 blocos) */}
      <div className="bg-historicoatividades w-full max-w-6xl p-6 rounded-2xl mt-8 flex justify-around gap-6">

        {/* Bloco 1 */}
        <div className="flex flex-col items-center gap-2 bg-white p-6 rounded shadow">
          <span className="text-4xl font-extrabold text-[#FF0000]">08</span>
          <p className="text-gray-600 font-semibold">Atividades</p>
          <p className="text-gray-400 text-sm">Em andamento</p>
        </div>

        {/* Bloco 2 */}
        <div className="flex flex-col items-center gap-2 bg-white p-6 rounded shadow">
          <span className="text-4xl font-extrabold text-[#00FF00]">06</span>
          <p className="text-gray-600 font-semibold">Tarefas</p>
          <p className="text-gray-400 text-sm">Concluídas</p>
        </div>

        {/* Bloco 3 */}
        <div className="flex flex-col items-center gap-2 bg-white p-6 rounded shadow">
          <span className="text-4xl font-extrabold text-[#0000FF]">03</span>
          <p className="text-gray-600 font-semibold">Reuniões</p>
          <p className="text-gray-400 text-sm">Agendadas</p>
        </div>

        {/* Bloco 4 */}
        <div className="flex flex-col items-center gap-2 bg-white p-6 rounded shadow">
          <span className="text-4xl font-extrabold text-[#FFA500]">15</span>
          <p className="text-gray-600 font-semibold">Notas</p>
          <p className="text-gray-400 text-sm">Registradas</p>
        </div>
      </div>

    </div>
  );
}
