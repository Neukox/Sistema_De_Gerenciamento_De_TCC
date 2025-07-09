  import '../../../index.css';
  import logo from '../../../assets/logo.png';
  import { useEffect } from 'react';
  //hooks
  import { InfosTCC }  from '../../../hooks/InfosTCC';
  import { useGeneralProgress } from '../../../hooks/GeneralProgess';
  import { useCompletedMarks } from '../../../hooks/CompletedMarks';
  import { usePendingTasks } from '../../../hooks/PendingTasks';
  import { useLateTasks } from '../../../hooks/LateTasks';
  //react icones
  import { IoPersonOutline } from "react-icons/io5";
  import { IoBookOutline } from "react-icons/io5";
  import { FaUserFriends } from "react-icons/fa";
  import { IoMdTrendingUp } from "react-icons/io";
  import { FaRegCheckCircle } from "react-icons/fa";
  import { FaRegClock } from "react-icons/fa";
  import { TiWarningOutline } from "react-icons/ti";
  import { LuTarget } from "react-icons/lu";
  import { IoCalendarClearOutline } from "react-icons/io5";
  import { GrTask } from "react-icons/gr";




  function MainDashboard() {
    useEffect(() => {
      document.title = 'FocoTCC - Dashboard';
    }, []);

    const { title, aluno, curso, orientador, coorientador } = InfosTCC();
    
    const { progress, description } = useGeneralProgress();

    const { checked, total,descriptionM } = useCompletedMarks();

    const {pending, descriptionP} = usePendingTasks();
    
    const { late, descriptionL } = useLateTasks();

    return (
      <div className="flex flex-col items-center bg-[#F3C50D] h-screen overflow-x-hidden w-screen pt-6">
        {/* Title and info container for the dashboard */}
        <div className="w-[85%] h-[40%] bg-[#fffbef] flex flex-col rounded-lg shadow-lg p-6 pt-1 px-auto">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-15 h-24" />
            <span className="text-black text-3xl font-bold">FocoTCC</span>
          </div>
          {/* Informative section */}
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-4xl flex-wrap font-sans font-bold">{title}</h1>

            <h1 className=" flex  items-center gap-2 text-2xl font-sans font-medium text-gray-600">   <IoPersonOutline />
              Aluno: {aluno} • {curso}
            </h1>

            <h1 className=" flex items-center gap-2 text-2xl font-sans font-normal text-gray-600"> <IoBookOutline />
              Orientador: {orientador}
            </h1>

            <h1 className=" flex items-center gap-2 text-2xl font-sans font-normal text-gray-600"> <FaUserFriends />
              Coorientador: {coorientador}
            </h1>
          </div>
        </div>
          {/* Boxs progress*/}
          <div className='flex flex-row items-center justify-between w-[85%] min-h-40  mt-4 gap-5 '>

            {/* Box 1 */}
            <div className='flex flex-col items-center justify-center  w-full h-full bg-[#fffbef]  rounded-lg shadow-lg' > 
            <span className='flex gap-2 items-center text-4xl font-bold'> <IoMdTrendingUp className='size-12 bg-[#dbeafe] w-16 rounded-md p-1'/> {progress}%</span>
              <span className=' text-2xl font-sans text-[#9ea09d]'>{description}</span>
            </div>

            {/* Box 2 */}
            <div className='flex flex-col items-center justify-center  w-full h-full bg-[#fffbef]  rounded-lg shadow-lg' >
              <span className='flex gap-2 items-center text-4xl font-bold'><FaRegCheckCircle className='size-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg' /> {checked}/{total}</span>
              <span className=' text-2xl font-sans text-[#9ea09d]'>{descriptionM}</span>
            </div>

            {/* Box 3 */}
            <div className='flex flex-col items-center justify-center  w-full h-full bg-[#fffbef]  rounded-lg shadow-lg' >
              <span className='flex gap-2 items-center text-4xl font-bold' > <FaRegClock className='size-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg' />
             {pending}</span>
             <span className='text-2xl font-sans text-[#9ea09d]'> {descriptionP} </span>
            </div>

            {/* Box 4 */}
            <div className='flex flex-col items-center justify-center  w-full h-full bg-[#fffbef]  rounded-lg shadow-lg' >
              <span className='flex gap-2 items-center text-4xl font-bold'> <TiWarningOutline className='size-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg ' />
              {late} </span>
              <span className='text-2xl font-sans text-[#9ea09d]'>{descriptionL}</span>
            </div>
        
          </div>

          {/* container to leave marks below the bar */}
          <div className="w-[85%] flex flex-col mt-4">
  
           {/* Bar */}
           <div className='flex flex-row items-center text-2xl gap-28 pl-8 bg-[#fffbef] w-full min-h-20 rounded-sm shadow-lg'>
            <span className='flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer '><LuTarget />Marcos</span>
            <span className='flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer '><GrTask />Tarefas</span>
            <span className='flex items-center gap-2 font-medium text-[#252525] hover:text-gray-400 cursor-pointer '><IoCalendarClearOutline />Anotações</span>
           </div>

           {/* container to align the bar and schedule side by side*/}
            <div className="flex flex-row gap-4 mt-4">
    
             {/* container marks */}
             <div className='flex flex-col w-[65%] bg-[#fffbef] min-h-60 rounded-lg shadow-lg p-6 mt-4 mb-5'>
             </div>

              {/* container to align schedule below the quick action */}
             <div className='flex flex-col w-[35%] '>

             {/* Conteúdo do Schedule */}
             <div className='bg-[#fffbef] min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-6'>
             <h1 className='text-3xl font-bold'>Cronograma</h1>
             </div>

             {/* Container quick action */}
             <div className='bg-[#fffbef] min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6'>
               <h1 className='text-3xl font-bold'>Cronograma</h1>
             </div>

            </div>

          </div>
</div>






      
      
      
      
      
      
      </div>
    );
  }

  export default MainDashboard;
