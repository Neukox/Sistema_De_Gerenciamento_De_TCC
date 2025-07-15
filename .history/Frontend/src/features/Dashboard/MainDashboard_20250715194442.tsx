import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

import  Span  from "@/components/ui/DashboardUtilits/Span"; // Importa o componente Span

// Importa hooks customizados
import { useCronograma } from "../../hooks/useCronograma";    // Calcula dias restantes no cronograma
import { useStatusTheme } from "../../hooks/useStatusTheme";  // Retorna cores e nome para o status do TCC
import { useTCCContext } from "../../hooks/useTCCContext";     // Busca dados do TCC (contexto)
import { useCard } from "../../hooks/useCard";                // Busca lista de tarefas/cards

// Importa componentes
import MarksCard from "../../components/MarksCard";

// Importa ícones React
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

// Importa hooks de contexto (título da página e autenticação)
import useTitle from "@/hooks/useTitle";
import useAuth from "../auth/context/useAuth";
import Button from "@/components/ui/Button";

function MainDashboard() {
  // Hook para navegação
  const navigate = useNavigate();
  
  // Usa hook que traz os dados do TCC do backend ou simulado
  const { tccData, loading } = useTCCContext();

  // Pega datas de início e entrega do TCC para passar para o cronograma
  const dataInicio = tccData?.data_inicio ?? null;
  const dataEntrega = tccData?.prazo_entrega ?? null;

  // Atualiza o título da aba do navegador na montagem do componente
  useTitle("FocoTCC - Dashboard Principal");

  // Usa hook que calcula os dias restantes entre dataInicio e dataEntrega
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });

  // Verifica se o prazo está atrasado (diasRestantes negativo)
  const prazoAtrasado = diasRestantes !== null && diasRestantes < 0;

  // Define a chave do status (se atrasado força "Atrasado", senão usa status do backend)
  const statusKey = prazoAtrasado ? "Atrasado" : tccData?.status ?? " ";

  // Pega as cores e o nome formatado do status usando o hook criado
  const status = useStatusTheme(statusKey);

  // Pega lista de tarefas/cards do hook useCard
  const { tarefas } = useCard();

  // Pega funções e dados do usuário logado (logout, nome etc)
  const { logout, user } = useAuth();

  // Função para navegar para o cadastro de TCC
  const handleCriarTCC = () => {
    navigate('/cadastrar-tcc');
  };

  // Verifica se o usuário já tem um TCC cadastrado
  const temTCC = tccData && tccData.title !== 'Nenhum TCC Cadastrado' && tccData.title !== 'Carregando...' && tccData.title !== 'Erro ao Carregar TCC' && tccData.id;

  // Debug log
  console.log('MainDashboard - tccData:', tccData);
  console.log('MainDashboard - temTCC:', temTCC);

  // Se estiver carregando dados, exibe tela de loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-secondary">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }

  // Renderiza o dashboard principal
  return (
    <div className="flex flex-col items-center bg-secondary h-screen overflow-x-hidden w-screen pt-6">
      {/* Cabeçalho e informações do projeto */}
      <div className="w-[85%] h-[40%] bg-neutral flex flex-col rounded-lg shadow-lg p-6 pt-1">
        {/* Linha com logo e título do sistema */}
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-[60px] h-24" />
            <span className="text-black text-3xl font-bold ml-4">FocoTCC</span>
          </div>

          {/* Informações do usuário e botão de logout */}
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
              variant="create"
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

      {/* Cartões de resumo do progresso, marcos e tarefas */}
      <div className="flex flex-row items-center justify-between w-[85%] min-h-40 mt-4 gap-5">
        {/* Cartão de progresso geral do TCC */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <IoMdTrendingUp className="w-12 h-12 bg-[#dbeafe] rounded-md p-1" />
            {tccData?.progress}%
          </span>
          <span className="text-2xl text-[#9ea09d]">
            Progresso geral do TCC
          </span>
        </div>

        {/* Cartão de marcos concluídos */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegCheckCircle className="w-12 h-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg" />
            {tccData.checked}/{tccData.total}
          </span>
          <span className="text-2xl text-[#9ea09d]">Marcos concluídos</span>
        </div>

        {/* Cartão de tarefas pendentes */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegClock className="w-12 h-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg" />
            {tccData.pending}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas Pendentes</span>
        </div>

        {/* Cartão de tarefas atrasadas */}
        <div className="flex flex-col items-center justify-center w-full bg-neutral rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <TiWarningOutline className="w-12 h-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg" />
            {tccData.late}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas atrasadas</span>
        </div>
      </div>

      {/* Barra de navegação com abas */}
      <div className="w-[85%] flex flex-col mt-4">
        <div className="flex flex-row items-center text-2xl gap-28 pl-8 bg-neutral w-full min-h-20 rounded-sm shadow-lg">
          <Span variant="primary" className="flex items-center gap-2">
            <LuTarget /> Marcos
          </Span>
          <Span variant="primary" className="flex items-center gap-2 ">
            <GrTask /> Tarefas
          </Span>
          <Span variant="primary" className="flex items-center gap-2 ">
            <IoCalendarClearOutline /> Notas
          </Span>
        </div>

        {/* Conteúdo principal abaixo da navbar */}
        <div className="flex flex-row gap-4 mt-4">
          {/* Seção dos marcos */}
          <div className="flex flex-col w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5">
             
             <div className="flex flex-row justify-between mb-4">
              <div className="flex flex-col">
            <h1 className="flex items-center gap-2 font-bold text-4xl">
              <LuTarget /> Marcos do Projeto
            </h1>
            <h4 className="text-gray-500 mt-1">
              Acompanhe o progresso dos principais marcos do seu TCC
            </h4>
            </div>
            <Button variant="create" className="flex flex-wrap items-center gap-2 px-4 py-2 h-14">
              <FaPlus size={20}  />
              Adicionar Marco
            </Button>
           </div>
            {/* Se não tiver tarefas, mostra mensagem */}
            {tarefas.length === 0 ? (
              <p className="text-gray-400 flex items-center mt-12 justify-center">
                Nenhuma tarefa cadastrada.
              </p>
            ) : (
              <div className="space-y-5 w-full ">
                {/* Mapeia cada tarefa para um componente MarksCard */}
                {tarefas.map((tarefa) => (
                  <MarksCard
                    key={tarefa.id}
                    id={tarefa.id}
                    title={tarefa.title}
                    description={tarefa.description}
                    prazo={tarefa.prazo}
                    stats={tarefa.stats}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Lado direito: cronograma + ações rápidas */}
          <div className="flex flex-col w-[35%]">
            {/* Seção do cronograma */}
            <div className="flex flex-col bg-neutral min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Cronograma</h1>

              {/* Mostra as datas e dias restantes */}
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

              {/* Exibe o status com as cores obtidas pelo hook */}
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

            {/* Seção de ações rápidas */}
            <div className="bg-neutral gap-8 min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Ações Rápidas</h1>
              <div className="flex flex-col gap-7 mt-3">
                {/* Botão para editar TCC */}
                <button className="border border-gray-400 px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300 transition-all flex items-center gap-2">
                  <CiEdit size={25} />
                  Editar TCC
                </button>

                {/* Botão para criar nova tarefa */}
                <button className="border border-gray-400 px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300 transition-all flex items-center gap-2">
                  <FaPlus size={25} />
                  Nova tarefa
                </button>

                {/* Botão para agendar reunião */}
                <button className="border border-gray-400 px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300 transition-all flex items-center gap-2">
                  <RiCalendarScheduleLine size={25} />
                  Agendar Reunião
                </button>

                {/* Botão para gerar relatório */}
                <button className="border border-gray-400 px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300 transition-all flex items-center gap-2">
                  <HiOutlineNewspaper size={25} />
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
