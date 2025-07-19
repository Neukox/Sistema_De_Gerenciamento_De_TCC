export function HistoricoAtividades() {
  return (
    <div className="flex flex-col items-center justify-start h-[1] bg-historico px-6 py-8 gap-4">
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
<div className="bg-historicoatividades w-full h-full max-w-6xl p-6 rounded-2xl flex flex-col gap-6">

  <div>
    <h1 className="flex font-semibold ml-3 text-2xl">Atividades Recentes</h1>
  </div>

  {/* Item 1: Tarefa Criada */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone task */}
      <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Tarefa Criada</h2>
        <p className="text-sm text-gray-600">Criou a tarefa 'Definição de metodologia'</p>
        <p className="text-sm text-gray-600">15/01/2024, 07:30</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* ícones extras completed */}
      <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4" />
      </svg>
    </div>
  </div>

  {/* Item 2: Marco Atingido */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone milestone */}
      <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v8m4-4H8" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Marco Atingido</h2>
        <p className="text-sm text-gray-600">Completou o marco 'Revisão Bibliográfica'</p>
        <p className="text-sm text-gray-600">14/01/2024, 13:45</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* ícones extras completed */}
      <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4" />
      </svg>
    </div>
  </div>

  {/* Item 3: Perfil Atualizado */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone profile */}
      <svg className="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20c0-2.21 3.58-4 6-4s6 1.79 6 4v1H6v-1z" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Perfil Atualizado</h2>
        <p className="text-sm text-gray-600">Atualizou informações do perfil</p>
        <p className="text-sm text-gray-600">14/01/2024, 06:15</p>
      </div>
    </div>
  </div>

  {/* Item 4: Nota Adicionada */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone note */}
      <svg className="w-6 h-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h6m-6 4h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Nota Adicionada</h2>
        <p className="text-sm text-gray-600">Adicionou nota sobre 'Metodologia de Pesquisa'</p>
        <p className="text-sm text-gray-600">13/01/2024, 11:20</p>
      </div>
    </div>
  </div>

  {/* Item 5: Configuração Alterada */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone system */}
      <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Configuração Alterada</h2>
        <p className="text-sm text-gray-600">Ativou notificações por email</p>
        <p className="text-sm text-gray-600">13/01/2024, 08:00</p>
      </div>
    </div>
  </div>

  {/* Item 6: Tarefa Atualizada */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone task */}
      <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Tarefa Atualizada</h2>
        <p className="text-sm text-gray-600">Marcou tarefa 'Coleta de dados' como concluída</p>
        <p className="text-sm text-gray-600">12/01/2024, 12:30</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* ícones extras completed */}
      <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4" />
      </svg>
    </div>
  </div>

  {/* Item 7: Tarefa Removida */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone task */}
      <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">Tarefa Removida</h2>
        <p className="text-sm text-gray-600">Removeu a tarefa 'Teste inicial'</p>
        <p className="text-sm text-gray-600">12/01/2024, 05:45</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* ícones extras cancelled */}
      <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </div>

  {/* Item 8: TCC Criado */}
  <div className="flex items-center justify-between bg-red-50 p-4 rounded shadow-sm">
    <div className="flex items-center gap-4">
      {/* Ícone milestone */}
      <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v8m4-4H8" />
      </svg>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800">TCC Criado</h2>
        <p className="text-sm text-gray-600">Criou novo projeto de TCC 'Sistema de Gestão'</p>
        <p className="text-sm text-gray-600">10/01/2024, 10:00</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* ícones extras completed */}
      <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4" />
      </svg>
    </div>
  </div>
</div>



      </div>
    
  );
}
