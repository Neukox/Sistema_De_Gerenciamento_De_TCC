import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

// Hooks customizados
import { useCronograma } from "../../hooks/useCronograma";
import { useStatusTheme } from "../../hooks/useStatusTheme";
import { useTCCContext } from "../../hooks/useTCCContext";
import { useCard } from "../../hooks/useCard";
import { useTabActive } from "@/hooks/TabAtive";
import { useNotes } from "@/hooks/Notes";

// Componentes
import MarksCard from "../../components/card/MarksCard";

// Ícones
import {
  IoPersonOutline,
  IoBookOutline,
  IoCalendarClearOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaUserFriends, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";
import { LuTarget } from "react-icons/lu";
import { GrTask } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaTrashCan } from "react-icons/fa6";

// Hooks de contexto
import useTitle from "@/hooks/useTitle";
import useAuth from "../auth/context/useAuth";
import Button from "@/components/ui/Button";

function MainDashboard() {
  // Navegação
  const navigate = useNavigate();
  
  // Dados do TCC
  const { tccData, loading } = useTCCContext();

  // Datas do cronograma
  const dataInicio = tccData?.data_inicio ?? null;
  const dataEntrega = tccData?.prazo_entrega ?? null;

  // Configurações da página
  useTitle("FocoTCC - Dashboard Principal");

  // Cálculos
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });
  const prazoAtrasado = diasRestantes !== null && diasRestantes < 0;
  const statusKey = prazoAtrasado ? "Atrasado" : tccData?.status ?? " ";
  const status = useStatusTheme(statusKey);

  // Dados das listas
  const { tarefas } = useCard();
  const { logout, user } = useAuth();
  const { activeTab, changeTab, isActive } = useTabActive<"marcos" | "tarefas" | "notas">("marcos");
  const { notaAtual, setNotaAtual, listaNota, salvarNota, erroNota, removerNota } = useNotes();

  // Funções
  const handleCriarTCC = () => {
    navigate('/cadastrar-tcc');
  };

  // Verificações
  const temTCC = tccData && tccData.title !== 'Nenhum TCC Cadastrado' && tccData.title !== 'Carregando...' && tccData.title !== 'Erro ao Carregar TCC' && tccData.id;

  // Debug
  console.log('MainDashboard - tccData:', tccData);
  console.log('MainDashboard - temTCC:', temTCC);

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-secondary">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }

  // Renderiza o dashboard
  return (
    <div className="flex flex-col items-center bg-secondary h-screen overflow-x-hidden w-screen pt-6">
      {/* Cabeçalho */}
      <div className="w-[85%] h-[40%] bg-neutral flex flex-col rounded-lg shadow-lg p-6 pt-1">
        {/* Logo e controles */}
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-[60px] h-24" />
            <span className="text-black text-3xl font-bold ml-4">FocoTCC</span>
          </div>

          {/* Usuário e botões */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">
              Olá, {user?.nome_completo || "Usuário"}
            </span>
              
            <div className="flex items-center gap-2">
            <Button
            variant="logout"
              onClick={logout}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <IoLogOutOutline size={20} />
              Sair
            </Button>

            {!temTCC && (
              <Button 
              variant="primary"
              onClick={handleCriarTCC}
              className="flex flex-wrap gap-2">
                    <FaPlus size={25} />
                Criar TCC
              </Button>
            )}
            </div>
          </div>
        </div>

        {/* Informações do TCC */}
        <div className="flex flex-col items-start gap-2 mt-4">
          {temTCC ? (
            <>
              <h1 className="text-4xl font-sans font-bold">{tccData?.title}</h1>
              <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-600">
                <IoPersonOutline /> Aluno: {tccData?.aluno} • {tccData?.curso}
              </h2>
              <h2 className="flex items-center gap-2 text-2xl text-gray-600">
                <IoBookOutline /> Orientador: {tccData?.orientador}
              </h2>
              <h2 className="flex items-center gap-2 text-2xl text-gray-600">
                <FaUserFriends /> Coorientador: {tccData?.coorientador}
              </h2>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-sans font-bold text-gray-500">Nenhum TCC Cadastrado</h1>
              <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-400">
                <IoPersonOutline /> Aluno: {user?.nome_completo || 'Usuário'}
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                Clique no botão "Criar TCC" acima para começar seu trabalho de conclusão de curso.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Cartões de resumo */}
      <div className="flex flex-row items-center justify-between w-[85%] min-h-40 mt-4 gap-5">
        {/* Progresso geral */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <IoMdTrendingUp className="w-12 h-12 bg-[#dbeafe] rounded-md p-1" />
            {tccData?.progress}%
          </span>
          <span className="text-2xl text-[#9ea09d]">
            Progresso geral do TCC
          </span>
        </div>

        {/* Marcos concluídos */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegCheckCircle className="w-12 h-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg" />
            {tccData.checked}/{tccData.total}
          </span>
          <span className="text-2xl text-[#9ea09d]">Marcos concluídos</span>
        </div>

        {/* Tarefas pendentes */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegClock className="w-12 h-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg" />
            {tccData.pending}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas Pendentes</span>
        </div>

        {/* Tarefas atrasadas */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <TiWarningOutline className="w-12 h-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg" />
            {tccData.late}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas atrasadas</span>
        </div>
      </div>

      {/* Navegação por abas */}
      <div className="w-[85%] flex flex-col mt-4">
        <div className="flex flex-row items-center text-2xl bg-neutral w-full min-h-20 rounded-lg shadow-lg overflow-hidden">
          <Button
            variant="select"
            className={`flex items-center justify-center gap-2 rounded-sm px-5 min-w-[180px] h-20 transition-all duration-400 ease-out
              ${isActive("marcos") ? "bg-gray-600 text-white rounded-l-lg" : "bg-neutral"}`}
            onClick={() => changeTab("marcos")}
          >
            <LuTarget /> Marcos
          </Button>

          {/* Container das outras abas */}
          <div className="flex flex-row flex-grow bg-neutral">
            <Button
              variant="select"
              className={`flex items-center justify-center gap-2 rounded-sm px-5 h-20 transition-all duration-400 ease-out
                ${isActive("tarefas") ? "bg-gray-600 text-white" : "bg-transparent"}`}
              onClick={() => changeTab("tarefas")}
            >
              <GrTask /> Tarefas
            </Button>

            <Button
              variant="select"
              className={`flex items-center justify-center gap-2 rounded-sm px-5 h-20 transition-all duration-400 ease-out
                ${isActive("notas") ? "bg-gray-600 text-white" : "bg-transparent"}`}
              onClick={() => changeTab("notas")}
            >
              <IoCalendarClearOutline /> Anotações
            </Button>
          </div>
        </div>

        {/* Conteúdo das abas */}
        <div className="flex flex-row gap-4 mt-4">
          {/* Aba: Marcos */}
          {activeTab === "marcos" && (
            <div className="flex flex-col w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5">
              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-3 font-bold text-4xl">
                    <LuTarget /> Marcos do Projeto
                  </h1>
                  <h4 className="text-gray-500 mt-1">
                    Acompanhe o progresso dos principais marcos do seu TCC
                  </h4>
                </div>
                <Button variant="primary" className="flex flex-wrap items-center gap-2 px-4 py-2 h-14">
                  <FaPlus size={20} />
                  Adicionar Marco
                </Button>
              </div>
              {tarefas.length === 0 ? (
                <p className="text-gray-400 flex items-center mt-12 justify-center">
                  Nenhuma tarefa cadastrada.
                </p>
              ) : (
                <div className="space-y-5 w-full">
                  {tarefas.map((tarefa) => (
                    <MarksCard
                      key={tarefa.id}
                      id={tarefa.id}
                      title={tarefa.title}
                      description={tarefa.description}
                      prazo={tarefa.prazo}
                      stats={tarefa.stats}
                      mostrar={true}
                      mostrarEditar={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Aba: Tarefas */}
          {activeTab === "tarefas" && (
            <div className="flex flex-col w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5">
              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-3 font-bold text-4xl">
                    <GrTask /> Tarefas
                  </h1>
                  <h4 className="text-gray-500 mt-1">
                    Gerencie suas tarefas do seu TCC
                  </h4>
                </div>
                <Button variant="primary" className="flex flex-wrap items-center gap-2 px-4 py-2 h-14">
                  <FaPlus size={20} />
                  Nova Tarefa
                </Button>
              </div>
              {tarefas.length === 0 ? (
                <p className="text-gray-400 flex items-center mt-12 justify-center">
                  Nenhuma tarefa cadastrada.
                </p>
              ) : (
                <div className="space-y-5 w-full">
                  {tarefas.map((tarefa) => (
                    <MarksCard
                      key={tarefa.id}
                      id={tarefa.id}
                      title={tarefa.title}
                      description={tarefa.description}
                      prazo={tarefa.prazo}
                      stats={tarefa.stats}
                      mostrar={false}
                      mostrarEditar={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )} 


          {/* Aba: Anotações */}
          {activeTab === "notas" && (
            <div className="flex flex-col w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5">
              <div className="flex flex-row mb-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-3 font-bold text-4xl">
                    <IoCalendarClearOutline /> Anotações e Observações
                  </h1>
                  <h4 className="text-gray-500 mt-1">
                    Registre aqui suas anotções e observações rapidas sobre o TCC
                  </h4>
                </div>
              </div>

              {/* Área de texto */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col">
                  <textarea
                    value={notaAtual}
                    onChange={(e) => setNotaAtual(e.target.value)}
                    placeholder="Adicione suas anotações..."
                    className="p-4 w-full h-44 mt-4 bg-gray-300 rounded-sm font-sans font-normal text-black border-gray-100 focus:outline-none"
                  />

                  <Button
                    variant="primary"
                    onClick={() => salvarNota(notaAtual)}
                    className="flex flex-wrap items-center gap-2 px-4 py-2 h-12 w-[28%] mt-4"
                  >
                    <FaPlus size={20} />
                    Adicionar Anotações
                  </Button>

                  {/* impede de adicionar notas vazias */}
                  {erroNota && (
                    <span className="text-red-500 text-sm mt-4">{erroNota}</span>
                  )}
                </div>

                {/* Se não houver notas, exibe mensagem */}
                <div className="mt-4 h-f overflow-y-visible">
                  {listaNota.length === 0 ? (
                    <p className="text-gray-400 flex items-center mt-8 justify-center">
                      Nenhuma tarefa cadastrada.
                    </p>
                  ) : (
                    /* Mapeia e renderiza cada nota da lista */
                    listaNota.map((nota, i) => (
                      <div key={i} className="bg-gray-300 rounded-lg p-4 mt-6">
                        <div className="mb-2 bg-gray-200 h-32 flex justify-between px-4 py-4 rounded-md shadow-sm">
                          <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                              <p className="whitespace-pre-wrap break-words w-full font-semibold text-gray-800">
                                • {nota.texto}
                              </p>
                              <span className="text-sm text-gray-600 mt-14 border-t">
                                {nota.data}
                              </span>
                            </div>
                            <Button variant="edit" onClick={() => {removerNota(nota.id)}}>
                              <FaTrashCan size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )} 

          {/* Sidebar direita */}
          <div className="flex flex-col w-[35%]">
            {/* Cronograma */}
            <div className="flex flex-col bg-neutral min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Cronograma</h1>

              {/* Datas */}
              <div className="flex flex-col text-xl text-[#9ea09d] gap-12 mt-5">
                <div className="flex justify-between">
                  <span>Data de início:</span>
                  <span className="text-[#252525] font-semibold">
                    {dataInicio !== null ? dataInicio : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Data de entrega:</span>
                  <span className="text-[#252525] font-semibold">
                    {dataEntrega !== null ? dataEntrega : "—"}
                  </span>
                </div>

                <div className="flex justify-between ">
                  <span>Dias restantes:</span>
                  <span className="text-[#252525] font-semibold ">
                    {diasRestantes !== null ? diasRestantes : "—"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="border-t mt-4 border-gray-200">
                {status && (
                  <span
                    className="text-xl font-bold mt-5 rounded-lg text-center p-1 flex justify-center items-center"
                    style={{
                      color: status.cor,
                      backgroundColor: status.colorBackground,
                      height: "2.5rem",
                    }}
                  >
                    {status.nome}
                  </span>
                )}
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="bg-neutral gap-8 min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Ações Rápidas</h1>
              <div className="flex flex-col gap-7 mt-3">
                <Button variant="quicks" className=" px-5 py-2 h-12  flex items-center gap-2">
                  <CiEdit size={25} />
                  Editar TCC
                </Button>

                <Button variant="quicks" className=" px-5 py-2 h-12  flex items-center gap-2">
                  <FaPlus size={25} />
                  Nova tarefa
                </Button>

                <Button variant="quicks" className=" px-5 py-2 h-12  flex items-center gap-2">
                  <RiCalendarScheduleLine size={25} />
                  Agendar Reunião
                </Button>

                <Button variant="quicks" className=" px-5 py-2 h-12  flex items-center gap-2">
                  <HiOutlineNewspaper size={25} />
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
