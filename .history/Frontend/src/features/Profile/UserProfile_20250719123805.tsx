import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";


import { useState } from "react";


import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/form";
import { Label } from "@/components/ui/form";


import useAuth from "@/features/auth/context/useAuth";
import { useTCCContext } from "../../hooks/useTCCContext";
import api from "@/lib/api/axios";
import { useTogglePassword } from "@/hooks/useTogglepassword";
import type { UserData } from "@/types/user/user";



import useTitle from "@/hooks/useTitle";

function UserProfile() {
  const { user, setSession } = useAuth();
  const { tccData } = useTCCContext();

  // Estados para os formulários
  const [nomeData, setNomeData] = useState({
    novoNome: ""
  });

  const [senhaData, setSenhaData] = useState({
    novaSenha: "",
    confirmarSenha: ""
  });

  // Estados de loading separados
  const [isLoadingNome, setIsLoadingNome] = useState(false);
  const [isLoadingSenha, setIsLoadingSenha] = useState(false);
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Hooks para mostrar/ocultar senhas
  const { mostrarSenha: mostrarNovaSenha, toggleSenha: toggleNovaSenha } = useTogglePassword();
  const { mostrarSenha: mostrarConfirmarSenha, toggleSenha: toggleConfirmarSenha } = useTogglePassword();

  useTitle("FocoTCC - Perfil de Usuário");

  // Função para exibir notificação
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Remove após 5 segundos
  };

  // Função para alterar nome
  const handleAlterarNome = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nomeData.novoNome.trim()) {
      showNotification("Por favor, digite um nome válido", "error");
      return;
    }

    setIsLoadingNome(true);
    try {
      const response = await api.put("/auth/alterar-nome", {
        nome_completo: nomeData.novoNome
      });

      if (response.status === 200) {
        showNotification("Nome alterado com sucesso!", "success");
        setNomeData({ novoNome: "" });
        
        // Atualizar o contexto do usuário com o novo nome
        if (user) {
          const updatedUser = {
            ...user,
            nome_completo: nomeData.novoNome
          };
          const currentToken = localStorage.getItem("token") || "";
          setSession(updatedUser, currentToken);
        }
      }
    } catch (error: unknown) {
      console.error("Erro ao alterar nome:", error);
      let errorMessage = "Erro ao alterar nome. Tente novamente.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setIsLoadingNome(false);
    }
  };

  // Função para alterar senha
  const handleAlterarSenha = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senhaData.novaSenha || !senhaData.confirmarSenha) {
      showNotification("Por favor, preencha todos os campos de senha", "error");
      return;
    }

    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      showNotification("As senhas não coincidem", "error");
      return;
    }

    if (senhaData.novaSenha.length < 6) {
      showNotification("A senha deve ter pelo menos 6 caracteres", "error");
      return;
    }

    setIsLoadingSenha(true);
    try {
      const response = await api.put("/auth/alterar-senha", {
        nova_senha: senhaData.novaSenha
      });

      if (response.status === 200) {
        showNotification("Senha alterada com sucesso!", "success");
        setSenhaData({ novaSenha: "", confirmarSenha: "" });
      }
    } catch (error: unknown) {
      console.error("Erro ao alterar senha:", error);
      let errorMessage = "Erro ao alterar senha. Tente novamente.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setIsLoadingSenha(false);
    }
  };


   const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col bg-secondary min-h-screen p-4 sm:p-6 justify-center">

      {/* Notificação */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto">
        {/* Título */}
        <div className="flex w-full items-center mb-4 bg-neutral p-4 rounded-lg shadow">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center shrink-0 gap-4"><FaArrowLeft size={36} onClick={handleNavigateToDashboard} className="hover:bg-gray-300 rounded-full p-1 cursor-pointer" />
 Perfil do Usuário</h1>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6">
        
        {/* Coluna da esquerda: Perfil + Estatísticas */}
        <div className="flex flex-col w-full lg:w-96 gap-6">
          {/* Perfil */}
          <div className="bg-neutral h-auto min-h-72 p-6 sm:p-8 rounded-lg shadow flex flex-col items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl sm:text-6xl text-gray-500 mb-4">
              <CgProfile />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">{user?.nome_completo || "Usuário"}</h2>
            <p className="text-sm text-gray-600 mb-2 text-center">Curso: {tccData?.curso}</p>
            <p className="text-sm text-gray-600 text-center">Orientador: {tccData?.orientador || "Não disponível"}</p>

          </div>

          {/* Estatísticas */}
          <div className="bg-neutral h-auto min-h-72 p-6 sm:p-8 rounded-lg shadow flex flex-col">
            <h1 className="text-lg sm:text-2xl font-bold mb-4 border-b-2 border-gray-200 flex items-center gap-2"> <IoStatsChart />
               Estatísticas</h1>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">TCCs Criados:</p>
                <p className="text-sm font-semibold text-black">0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">Tarefas Concluídas:</p>
                <p className="text-sm font-semibold text-black">0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">Marcos Atingidos:</p>
                <p className="text-sm font-semibold text-black">0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">Progresso Geral:</p>
                <p className="text-sm font-bold text-[#244C9E]">{tccData?.progress || "Não encontrado"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da direita: Informações pessoais */}
        <div className="flex-1 bg-neutral p-6 sm:p-8 rounded-lg shadow flex flex-col">
          <h1 className="text-lg sm:text-2xl font-bold mb-6 border-b-2 border-gray-200 flex items-center gap-2">
            <ImProfile /> Informações Pessoais
          </h1>

          <div className="flex flex-col gap-6 sm:gap-10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-56">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Nome Completo:</p>
                <p className="text-sm font-semibold text-black">{user?.nome_completo || "Usuário"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Email:</p>
                <p className="text-sm font-semibold text-black">{user?.email || "Email não disponível"}</p>
              </div>
            </div>

            <form onSubmit={handleAlterarNome} className="flex flex-col w-full max-w-xs">
              <Label htmlFor="nome" className="text-sm text-gray-600 font-medium mb-2">Alterar Nome</Label>
              <Input 
                id="nome" 
                type="text" 
                placeholder="Digite seu nome" 
                className="w-full" 
                value={nomeData.novoNome}
                onChange={(e) => setNomeData({ novoNome: e.target.value })}
                disabled={isLoadingNome}
              />
              <Button 
                type="submit"
                variant="primary" 
                className="mt-4 max-w-40"
                disabled={isLoadingNome}
              >
                {isLoadingNome ? "Alterando..." : "Alterar Nome"}
              </Button>
            </form>
          </div>

            <div className="border-t-2 border-gray-200 my-6">

                <h1 className="text-lg sm:text-2xl font-bold mb-4 flex items-center gap-2 mt-3">
                    <IoLockClosedOutline  /> Altere sua Senha
                </h1>
                
                <form onSubmit={handleAlterarSenha}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                     <div className="flex flex-col w-full max-w-md">
                        <Label htmlFor="senha" className="text-sm text-gray-600 font-medium mb-2">Alterar Senha</Label>
                        <div className="relative">
                          <Input 
                            id="senha" 
                            type={mostrarNovaSenha ? "text" : "password"} 
                            placeholder="Digite sua nova senha" 
                            className="w-full pr-10" 
                            value={senhaData.novaSenha}
                            onChange={(e) => setSenhaData(prev => ({ ...prev, novaSenha: e.target.value }))}
                            disabled={isLoadingSenha}
                          />
                          <button
                            type="button"
                            onClick={toggleNovaSenha}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            disabled={isLoadingSenha}
                          >
                            {mostrarNovaSenha ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                          </button>
                        </div>
                     </div>

                     <div className="flex flex-col w-full max-w-md">
                        <Label htmlFor="confirmar-senha" className="text-sm text-gray-600 font-medium mb-2">Confirmar Senha</Label>
                        <div className="relative">
                          <Input 
                            id="confirmar-senha" 
                            type={mostrarConfirmarSenha ? "text" : "password"} 
                            placeholder="Confirme sua nova senha" 
                            className="w-full pr-10" 
                            value={senhaData.confirmarSenha}
                            onChange={(e) => setSenhaData(prev => ({ ...prev, confirmarSenha: e.target.value }))}
                            disabled={isLoadingSenha}
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmarSenha}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            disabled={isLoadingSenha}
                          >
                            {mostrarConfirmarSenha ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                          </button>
                        </div>
                     </div>
                  </div>
                  <Button 
                    type="submit"
                    variant="primary" 
                    className="mt-4 max-w-40"
                    disabled={isLoadingSenha}
                  >
                    {isLoadingSenha ? "Alterando..." : "Alterar Senha"}
                  </Button>
                </form>
            </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
