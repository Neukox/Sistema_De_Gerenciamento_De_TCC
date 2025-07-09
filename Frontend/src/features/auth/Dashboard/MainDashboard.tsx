import '../../../index.css';
import logo from '../../../assets/logo.png';
import { useEffect } from 'react';

// Custom hooks
import { InfosTCC } from '../../../hooks/InfosTCC';
import { useGeneralProgress } from '../../../hooks/GeneralProgess';
import { useCompletedMarks } from '../../../hooks/CompletedMarks';
import { usePendingTasks } from '../../../hooks/PendingTasks';
import { useLateTasks } from '../../../hooks/LateTasks';

// React icons
import { IoPersonOutline, IoBookOutline, IoCalendarClearOutline } from "react-icons/io5";
import { FaUserFriends, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";
import { LuTarget } from "react-icons/lu";
import { GrTask } from "react-icons/gr";

function MainDashboard() {
  // Set page title on mount
  useEffect(() => {
    document.title = 'FocoTCC - Dashboard';
  }, []);

  // Retrieve data from custom hooks
  const { title, aluno, curso, orientador, coorientador } = InfosTCC();
  const { progress, description } = useGeneralProgress();
  const { checked, total, descriptionM } = useCompletedMarks();
  const { pending, descriptionP } = usePendingTasks();
  const { late, descriptionL } = useLateTasks();

  return (
    <div className="flex flex-col items-center bg-[#F3C50D] h-screen overflow-x-hidden w-screen pt-6">
      {/* Header and project info */}
      <div className="w-[85%] h-[40%] bg-[#fffbef] flex flex-col rounded-lg shadow-lg p-6 pt-1">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-[60px] h-24" />
          <span className="text-black text-3xl font-bold ml-4">FocoTCC</span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-4">
          <h1 className="text-4xl font-sans font-bold">{title}</h1>
          <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-600">
            <IoPersonOutline /> Aluno: {aluno} • {curso}
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
            <IoBookOutline /> Orientador: {orientador}
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
            <FaUserFriends /> Coorientador: {coorientador}
          </h2>
        </div>
      </div>

      {/* Summary cards */}
      <div className="flex flex-row items-center justify-between w-[85%] min-h-40 mt-4 gap-5">
        {/* Progress card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <IoMdTrendingUp className="w-12 h-12 bg-[#dbeafe] rounded-md p-1" />
            {progress}%
          </span>
          <span className="text-2xl text-[#9ea09d]">{description}</span>
        </div>

        {/* Completed milestones card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegCheckCircle className="w-12 h-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg" />
            {checked}/{total}
          </span>
          <span className="text-2xl text-[#9ea09d]">{descriptionM}</span>
        </div>

        {/* Pending tasks card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <FaRegClock className="w-12 h-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg" />
            {pending}
          </span>
          <span className="text-2xl text-[#9ea09d]">{descriptionP}</span>
        </div>

        {/* Overdue tasks card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <TiWarningOutline className="w-12 h-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg" />
            {late}
          </span>
          <span className="text-2xl text-[#9ea09d]">{descriptionL}</span>
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
            {/* You can place milestone cards here */}
          </div>

          {/* Right side: schedule + quick actions */}
          <div className="flex flex-col w-[35%]">
            {/* Schedule section */}
            <div className="bg-[#fffbef] min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Cronograma</h1>
            </div>

            {/* Quick actions section */}
            <div className="bg-[#fffbef] min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Ações Rápidas</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;