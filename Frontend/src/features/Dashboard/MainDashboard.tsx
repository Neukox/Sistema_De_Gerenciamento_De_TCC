// Hooks e bibliotecas
import { useNavigate } from "react-router-dom";
import { useTCCContext } from "../../hooks/useTCCContext";
import useTitle from "@/hooks/useTitle";
import { calculatePercentage } from "@/utils/calculate";
// Ícones
import { IoMdPeople, IoMdTrendingUp } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BookOpen } from "lucide-react";
import { CgNotes } from "react-icons/cg";
// Componentes
import { Card, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import TCCInfo from "../TCC/info/TCCInfo";
import TCCProgress from "../TCC/progress/TCCProgress";
import TCCTimeline from "../TCC/timeline/TCCTimeline";

// Hooks de contexto
import useAuth from "../auth/context/useAuth";

function MainDashboard() {
  // Navegação
  const navigate = useNavigate();

  // Dados do TCC
  const { tccData, loading } = useTCCContext();

  // Configurações da página
  useTitle("Dashboard Principal | Foco TCC");

  const { user } = useAuth();

  // Verificações
  const temTCC =
    tccData &&
    tccData.title !== "Nenhum TCC Cadastrado" &&
    tccData.title !== "Carregando..." &&
    tccData.title !== "Erro ao Carregar TCC" &&
    tccData.id;

  // Debug
  console.log("MainDashboard - tccData:", tccData);
  console.log("MainDashboard - temTCC:", temTCC);

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
    <div className="flex flex-col gap-8 min-h-screen w-full max-w-8xl">
      {/* Infomaçoẽs de TCC */}
      <TCCInfo />
      {/* Cartões de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {/* Tarefas */}
        <Card className="flex items-center justify-between shadow-lg p-6 min-h-32">
          <div className="flex flex-col">
            <h3 className="text-md font-semibold">Tarefas</h3>
            <span className="flex gap-1 items-center text-4xl font-semibold">
              {tccData.checked}/{tccData.total}
            </span>
            <span className="text-blue-500 font-medium">
              {`${calculatePercentage(
                tccData.checked,
                tccData.total
              )}% Concluídas`}
            </span>
          </div>
          <div className="bg-blue-100 size-16 rounded-full p-2 flex items-center justify-center">
            <IoMdTrendingUp className="size-10 text-blue-400" />
          </div>
        </Card>
        {/* Reuniões */}
        <Card className="flex items-center justify-between shadow-lg p-6 min-h-32">
          <div>
            <h3 className="text-md font-semibold">Reuniões</h3>
            <span className="flex gap-1 items-center text-4xl font-semibold">
              0
            </span>
            <span className=" text-violet-600 font-medium">0 Agendadas</span>
          </div>
          <div className="size-16 bg-violet-200 rounded-full flex items-center justify-center">
            <IoMdPeople className="size-10 text-violet-500" />
          </div>
        </Card>
        {/* Anotações */}
        <Card className="flex items-center justify-between shadow-lg p-6 min-h-32">
          <div>
            <h3 className="text-md font-semibold">Anotações</h3>
            <span className="flex gap-1 items-center text-4xl font-semibold">
              0
            </span>
            <span className=" text-orange-500 font-medium">0 esta semana</span>
          </div>
          <div className="size-16 bg-orange-200 rounded-full flex items-center justify-center">
            <CgNotes className="size-10 text-orange-500" />
          </div>
        </Card>
      </div>
      {/* Progresso, Cronograma do TCC e ações rápidas */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Progressp do TCC */}
        <TCCProgress />
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          {/* Cronograma */}
          <TCCTimeline />
          {/* Ações rápidas */}
          <Card className="w-full p-6 flex flex-col gap-6">
            <CardHeader className="p-0 gap-2">
              <BookOpen className="size-6" />
              <h2 className="text-xl font-semibold">Ações Rápidas</h2>
            </CardHeader>
            <div className="flex flex-col gap-6">
              <Button variant="quicks" className="flex items-center gap-2">
                <CiEdit className="size-6" />
                Editar TCC
              </Button>
              <Button variant="quicks" className="flex items-center gap-2">
                <FaPlus className="size-6" />
                Nova tarefa
              </Button>
              <Button variant="quicks" className="flex items-center gap-2">
                <RiCalendarScheduleLine className="size-6" />
                Agendar Reunião
              </Button>
              <Button variant="quicks" className="flex items-center gap-2">
                <HiOutlineNewspaper className="size-6" />
                Gerar Relatório
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
