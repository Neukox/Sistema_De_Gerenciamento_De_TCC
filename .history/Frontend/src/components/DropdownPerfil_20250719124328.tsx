import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
    DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

import { LuHistory } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import useAuth from "@/features/auth/context/useAuth";

import { useTCCContext } from "../hooks/useTCCContext";


export function DropdownPerfil() {
  const { user, logout } = useAuth();
  const { tccData, } = useTCCContext();
  const navigate = useNavigate();

  const handleNavigateToHistory = () => {
    navigate('/historico-atividades');
  };

  const handleNavigateToProfile = () => {
    navigate('/perfil');
  };


    return (

       <DropdownMenu >
            
            <DropdownMenuTrigger className="flex gap-14 items-center justify-center outline-none transition-all duration-300 ">
                <div className="text-left text-sm">
                <span className="text-lg font-medium">
                 Olá, {user?.nome_completo || "Usuário"}
                 </span>
                    <div className=" font-sans font-medium text-muted gap-2">{user?.email || "Email não disponível"}</div>
                </div>

                  <IoIosArrowDown className="transition-transform duration-200 " />
                
            </DropdownMenuTrigger >

            <DropdownMenuContent className="w-64 p-5 cursor-pointer bg-white shadow-lg rounded-lg border-border-gray-200 transition-all duration-200">
                
                <DropdownMenuLabel>
                  <div className="flex flex-col items-start border-b border-gray-300 pb-3  ">
                     <span className="font-medium">Davi Leal</span>
                      <span className="text-xs text-gray-500 font-semibold  ">davi.leal@example.com</span>
                      <span className="text-xs text-gray-500 mt-1"><span className="font-semibold ">Curso: {tccData?.curso}</span> 
                      </span>
                   </div>

                </DropdownMenuLabel>
                   

                <DropdownMenuSeparator />
                  
                  <div className="border-b border-gray-300 pb-3">
                    <DropdownMenuItem className="cursor-pointer">
                    
                    
                        <Button className="flex items-center px-0 gap-2 mt-2 "
                          variant="DropProf"
                          onClick={handleNavigateToProfile}>
                          <CgProfile size={20} />
                          <span className="font-sans font-semibold">Perfil</span>
                       </Button>
                </DropdownMenuItem>
                  
                     <DropdownMenuItem>
                        <Button 
                          className="flex items-center px-0 gap-2 mt-2"
                          variant="DropProf"
                          onClick={handleNavigateToHistory}
                        >
                          <LuHistory size={20} />
                         <span className="font-sans font-semibold"> Histórico </span>
                        </Button>
                     </DropdownMenuItem>
                    </div>
                  <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-red-500">
                      <Button
                          variant="logout"
                          onClick={logout}
                          className="flex items-center gap-2 px-1 py-2 rounded-lg transition-colors" >
                          <IoLogOutOutline size={20} />
                          Sair
                        </Button>
                    </DropdownMenuItem>


            </DropdownMenuContent>

       </DropdownMenu>



    )

}