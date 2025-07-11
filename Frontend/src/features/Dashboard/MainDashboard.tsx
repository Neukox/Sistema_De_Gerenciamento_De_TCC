import logo from "@/assets/logo.png";

import { useState } from "react";

// Custom hooks

import { useCronograma } from "../../hooks/useCronograma";
import { useStatusTheme } from "../../hooks/useStatusTheme";
import { useTCCData } from "../../hooks/useTCCData";

// React icons
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
import useTitle from "@/hooks/useTitle";
import useAuth from "../auth/context/useAuth";

function MainDashboard() {
  // Simula as datas do backend com useState e useEffect
  const [dataInicio] = useState<string | null>(null);
  const [dataEntrega] = useState<string | null>(null);

  // Set page title on mount
  useTitle("FocoTCC - Dashboard Principal");

  // Usa hook para calcular dias restantes só se datas existirem
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });
  // Busca dados dos outros hooks

  const status = useStatusTheme();
  const { tccData, loading } = useTCCData();

  const { logout, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3C50D]">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-[#F3C50D] h-screen overflow-x-hidden w-screen pt-6">
      {/* Header and project info */}
      <div className="w-[85%] h-[40%] bg-[#fffbef] flex flex-col rounded-lg shadow-lg p-6 pt-1">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-[60px] h-24" />
            <span className="text-black text-3xl font-bold ml-4">FocoTCC</span>
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">
              Olá, {user?.nome_completo || "Usuário"}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <IoLogOutOutline size={20} />
              Sair
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 mt-4">
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
        </div>
      </div>

      {/* Summary cards */}
      <div className="flex flex-row items-center justify-between w-[85%] min-h-40 mt-4 gap-5">
        {/* Progress card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <IoMdTrendingUp className="w-12 h-12 bg-[#dbeafe] rounded-md p-1" />
            {tccData?.progress}%
          </span>
          <span className="text-2xl text-[#9ea09d]">
            Progresso geral do TCC
          </span>
        </div>

        {/* Completed milestones card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegCheckCircle className="w-12 h-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg" />
            {tccData.checked}/{tccData.total}
          </span>
          <span className="text-2xl text-[#9ea09d]">Marcos concluídos</span>
        </div>

        {/* Pending tasks card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegClock className="w-12 h-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg" />
            {tccData.pending}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas Pendentes</span>
        </div>

        {/* Overdue tasks card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <TiWarningOutline className="w-12 h-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg" />
            {tccData.late}
          </span>
          <span className="text-2xl text-[#9ea09d]">Tarefas atrasadas</span>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="w-[85%] flex flex-col mt-4">
        <div className="flex flex-row items-center text-2xl gap-28 pl-8 bg-[#fffbef] w-full min-h-20 rounded-sm shadow-lg">
          <span className="flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer">
            <LuTarget /> Marcos
          </span>
          <span className="flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer">
            <GrTask /> Tarefas
          </span>
          <span className="flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer">
            <IoCalendarClearOutline /> Notas
          </span>
        </div>

        {/* Main content below navbar */}
        <div className="flex flex-row gap-4 mt-4">
          {/* Milestones section */}
          <div className="flex flex-col w-[65%] bg-[#fffbef] min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5">
            {/* Você pode adicionar cards de marcos aqui */}
          </div>

          {/* Right side: schedule + quick actions */}
          <div className="flex flex-col w-[35%]">
            {/* Schedule section */}
            <div className="flex flex-col bg-[#fffbef] min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Cronograma</h1>

              <div className="flex flex-col  text-xl text-[#9ea09d] gap-12 mt-5">
                <div className="flex justify-between ">
                  <span>Data de início:</span>
                  <span className="text-[#252525] font-semibold">
                    {" "}
                    {dataInicio !== null ? dataInicio : "—"}
                  </span>
                </div>

                <div className="flex justify-between ">
                  <span>Data de entrega:</span>
                  <span className="text-[#252525] font-semibold">
                    {" "}
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

              {status && (
                <span
                  className="text-xl font-semibold mt-5 rounded-lg text-center p-1 flex justify-center items-center "
                  style={{
                    color: status.cor,
                    backgroundColor: status.colorBackground,
                    height: "2.5rem",
                  }}
                >
                  {" "}
                  {status.nome}
                </span>
              )}
            </div>

            {/* Quick actions section */}
            <div className="bg-[#fffbef]  gap-8 min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Ações Rápidas</h1>
              <div className="flex flex-col   gap-7 mt-3">
                <span className="border border-gray-400  px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300  transition-all flex items-center gap-2">
                  {" "}
                  <CiEdit size={25} />
                  Editar TCC
                </span>
                <span className="border border-gray-400  px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300  transition-all flex items-center gap-2">
                  {" "}
                  <FaPlus size={25} />
                  Nova tarefa
                </span>
                <span className="border border-gray-400  px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300  transition-all flex items-center gap-2">
                  {" "}
                  <RiCalendarScheduleLine size={25} />
                  Agendar Reunião
                </span>
                <span className="border border-gray-400  px-5 py-2 rounded-md h-12 shadow-lg cursor-pointer hover:translate-y-1 hover:bg-slate-300  transition-all flex items-center gap-2">
                  {" "}
                  <HiOutlineNewspaper size={25} />
                  Gerar Relatório
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
