<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
import  MarksCard from "../../components/card/MarksCard";
import { DropdownPerfil } from "@/components/DropdownPerfil";
// Ícones
import {
  IoPersonOutline,
  IoBookOutline,
  IoCalendarClearOutline,
} from "react-icons/io5";
=======
<<<<<<<< HEAD:Frontend/src/features/auth/Dashboard/MainDashboard.tsx
import '../../../index.css';
import logo from '../../../assets/logo.png';
import { useEffect, useState } from 'react';

// Custom hooks
import { InfosTCC } from '../../../hooks/InfosTCC';
import { useGeneralProgress } from '../../../hooks/GeneralProgess';
import { useCompletedMarks } from '../../../hooks/CompletedMarks';
import { usePendingTasks } from '../../../hooks/PendingTasks';
import { useLateTasks } from '../../../hooks/LateTasks';
import { useCronograma } from '../../../hooks/useCronograma';
import { useStatusTheme } from '../../../hooks/useStatusTheme';
========
import logo from '@/assets/logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUserData } from '../fetchLoginAPI';
=======
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
>>>>>>> 2761d5f (refatora componentes de autenticação)

=======
import "../../../index.css";
import logo from "../../../assets/logo.png";
=======
import logo from "@/assets/logo.png";
>>>>>>> 6ae9b3f (refatora importações para usar caminhos absolutos e ativa funcionalidades de autenticação nos hooks de login e registro)

import { useState } from "react";
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)

// Custom hooks

import { useCronograma } from "../../hooks/useCronograma";
import { useStatusTheme } from "../../hooks/useStatusTheme";
import { useTCCData } from "../../hooks/useTCCData";

>>>>>>>> 742fd03 (refatora estrutura de autenticação, adiciona componentes de contêiner e página de login):Frontend/src/features/Dashboard/MainDashboard.tsx
// React icons
<<<<<<< HEAD
import { IoPersonOutline, IoBookOutline, IoCalendarClearOutline, IoLogOutOutline } from "react-icons/io5";
>>>>>>> 742fd03 (refatora estrutura de autenticação, adiciona componentes de contêiner e página de login)
=======
import {
  IoPersonOutline,
  IoBookOutline,
  IoCalendarClearOutline,
  IoLogOutOutline,
} from "react-icons/io5";
>>>>>>> 2761d5f (refatora componentes de autenticação)
import { FaUserFriends, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";
import { LuTarget } from "react-icons/lu";
import { GrTask } from "react-icons/gr";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
<<<<<<< HEAD
import { FaTrashCan } from "react-icons/fa6";

// Hooks de contexto
import useTitle from "@/hooks/useTitle";
import useAuth from "../auth/context/useAuth";
import Button from "@/components/ui/Button";
=======
import { useTCCData } from "@/hooks/useTCCData";
import useAuth from "../auth/context/useAuth";
import useTitle from "@/hooks/useTitle";
>>>>>>> 2761d5f (refatora componentes de autenticação)

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

  const {  user } = useAuth();
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

    <div className="flex flex-col items-center bg-secondary min-h-screen overflow-x-hidden overflow-y-auto scrollbar-hide w-full px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Cabeçalho */}
      <div className="w-full max-w-7xl bg-neutral flex flex-col rounded-lg shadow-lg p-4 sm:p-6">
        {/* Logo e controles */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-12 h-16 sm:w-[60px] sm:h-24" />
            <span className="text-black text-xl sm:text-3xl font-bold ml-2 sm:ml-4">FocoTCC</span>
          </div>

          {/* Usuário e botões */}

          <div className="flex items-center">
            <div className="flex items-center gap-3 sm:gap-5">
              <DropdownPerfil />


              {!temTCC && (
                <Button 
                  variant="primary"
                  onClick={handleCriarTCC}
                  className="flex flex-wrap gap-2 text-sm sm:text-base px-3 sm:px-4"
                >
                  <FaPlus size={20} className="sm:hidden" />
                  <FaPlus size={25} className="hidden sm:block" />
                  <span className="hidden sm:inline">Criar TCC</span>
                  <span className="sm:hidden">Criar</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Informações do TCC */}
        <div className="flex flex-col items-start gap-2 mt-4">
          {temTCC ? (
            <>
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-sans font-bold break-words">{tccData?.title}</h1>
              <h2 className="flex items-center gap-2 text-sm sm:text-xl lg:text-2xl font-medium text-gray-600 flex-wrap">
                <IoPersonOutline className="flex-shrink-0" /> 
                <span>Aluno: {tccData?.aluno} • {tccData?.curso}</span>
              </h2>
              <h2 className="flex items-center gap-2 text-sm sm:text-xl lg:text-2xl text-gray-600 flex-wrap">
                <IoBookOutline className="flex-shrink-0" /> 
                <span>Orientador: {tccData?.orientador}</span>
              </h2>
              <h2 className="flex items-center gap-2 text-sm sm:text-xl lg:text-2xl text-gray-600 flex-wrap">
                <FaUserFriends className="flex-shrink-0" /> 
                <span>Coorientador: {tccData?.coorientador}</span>
              </h2>
            </>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-sans font-bold text-gray-500">Nenhum TCC Cadastrado</h1>
              <h2 className="flex items-center gap-2 text-sm sm:text-xl lg:text-2xl font-medium text-gray-400 flex-wrap">
                <IoPersonOutline className="flex-shrink-0" /> 
                <span>Aluno: {user?.nome_completo || 'Usuário'}</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
                Clique no botão "Criar TCC" acima para começar seu trabalho de conclusão de curso.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Cartões de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mt-4 gap-3 sm:gap-5">
        {/* Progresso geral */}
        <div className="flex flex-col items-center justify-center bg-neutral rounded-lg shadow-lg p-3 sm:p-4 min-h-[120px]">
          <span className="flex gap-1 sm:gap-2 items-center text-xl sm:text-2xl lg:text-4xl font-bold">
            <IoMdTrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#dbeafe] rounded-md p-1" />
            {tccData?.progress}%
          </span>
          <span className="text-xs sm:text-base lg:text-2xl text-[#9ea09d] text-center">
            Progresso geral do TCC
          </span>
        </div>

        {/* Marcos concluídos */}
        <div className="flex flex-col items-center justify-center bg-neutral rounded-lg shadow-lg p-3 sm:p-4 min-h-[120px]">
          <span className="flex gap-1 sm:gap-2 items-center text-xl sm:text-2xl lg:text-4xl font-bold">
            <FaRegCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#d8fce4] text-[#7dc89c] p-1 rounded-lg" />
            {tccData.checked}/{tccData.total}
          </span>
          <span className="text-xs sm:text-base lg:text-2xl text-[#9ea09d] text-center">Marcos concluídos</span>
        </div>

        {/* Tarefas pendentes */}
        <div className="flex flex-col items-center justify-center bg-neutral rounded-lg shadow-lg p-3 sm:p-4 min-h-[120px]">
          <span className="flex gap-1 sm:gap-2 items-center text-xl sm:text-2xl lg:text-4xl font-bold">
            <FaRegClock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#f2d1b1] text-[#dc9058] p-1 rounded-lg" />
            {tccData.pending}
          </span>
          <span className="text-xs sm:text-base lg:text-2xl text-[#9ea09d] text-center">Tarefas Pendentes</span>
        </div>

        {/* Tarefas atrasadas */}
        <div className="flex flex-col items-center justify-center bg-neutral rounded-lg shadow-lg p-3 sm:p-4 min-h-[120px]">
          <span className="flex gap-1 sm:gap-2 items-center text-xl sm:text-2xl lg:text-4xl font-bold">
            <TiWarningOutline className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#ffe1e0] text-[#d36c6c] p-1 rounded-lg" />
            {tccData.late}
          </span>
          <span className="text-xs sm:text-base lg:text-2xl text-[#9ea09d] text-center">Tarefas atrasadas</span>
        </div>
      </div>

      {/* Navegação por abas */}
      <div className="w-full max-w-7xl flex flex-col mt-4">
        <div className="flex flex-row items-center text-base sm:text-xl lg:text-2xl bg-neutral w-full min-h-16 sm:min-h-20 rounded-lg shadow-lg overflow-hidden">
          <Button
            variant="select"
            className={`flex items-center justify-center gap-1 sm:gap-2 rounded-sm px-3 sm:px-5 flex-1 sm:min-w-[180px] sm:flex-none h-16 sm:h-20 transition-all duration-400 ease-out text-sm sm:text-base
              ${isActive("marcos") ? "bg-gray-600 text-white rounded-l-lg" : "bg-neutral"}`}
            onClick={() => changeTab("marcos")}
          >
            <LuTarget className="w-4 h-4 sm:w-5 sm:h-5" /> 
            <span className="hidden sm:inline">Marcos</span>
            <span className="sm:hidden">Marcos</span>
          </Button>

          <Button
            variant="select"
            className={`flex items-center justify-center gap-1 sm:gap-2 rounded-sm px-3 sm:px-5 flex-1 sm:min-w-[180px] sm:flex-none h-16 sm:h-20 transition-all duration-400 ease-out text-sm sm:text-base
              ${isActive("tarefas") ? "bg-gray-600 text-white" : "bg-transparent"}`}
            onClick={() => changeTab("tarefas")}
          >
            <GrTask className="w-4 h-4 sm:w-5 sm:h-5" /> 
            <span className="hidden sm:inline">Tarefas</span>
            <span className="sm:hidden">Tarefas</span>
          </Button>

          <Button
            variant="select"
            className={`flex items-center justify-center gap-1 sm:gap-2 rounded-sm px-3 sm:px-5 flex-1 sm:min-w-[180px] sm:flex-none h-16 sm:h-20 transition-all duration-400 ease-out text-sm sm:text-base
              ${isActive("notas") ? "bg-gray-600 text-white " : "bg-transparent"}`}
            onClick={() => changeTab("notas")}
          >
            <IoCalendarClearOutline className="w-4 h-4 sm:w-5 sm:h-5" /> 
            <span className="hidden sm:inline">Anotações</span>
            <span className="sm:hidden">Notas</span>
          </Button>
        </div>

        {/* Conteúdo das abas */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          {/* Aba: Marcos */}
          {activeTab === "marcos" && (
            <div className="flex flex-col w-full lg:w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-4 sm:p-6 mt-4 mb-5">
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-4xl">
                    <LuTarget className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" /> 
                    <span>Marcos do Projeto</span>
                  </h1>
                  <h4 className="text-gray-500 mt-1 text-sm sm:text-base">
                    Acompanhe o progresso dos principais marcos do seu TCC
                  </h4>
                </div>
                <Button variant="primary" className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto">
                  <FaPlus size={16} className="sm:hidden" />
                  <FaPlus size={20} className="hidden sm:block" />
                  Adicionar Marco
                </Button>
              </div>
              {tarefas.length === 0 ? (
                <p className="text-gray-400 flex items-center mt-12 justify-center text-sm sm:text-base">
                  Nenhuma marco cadastrada.
                </p>
              ) : (
                <div className="space-y-3 sm:space-y-5 w-full">
                
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
            <div className="flex flex-col w-full lg:w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-4 sm:p-6 mt-4 mb-5">
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-4xl">
                    <GrTask className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" /> 
                    <span>Tarefas</span>
                  </h1>
                  <h4 className="text-gray-500 mt-1 text-sm sm:text-base">
                    Gerencie suas tarefas do seu TCC
                  </h4>
                </div>
                <Button variant="primary" className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto" onClick={() => navigate("/criar-atividade") }>
                  <FaPlus size={16} className="sm:hidden" />
                  <FaPlus size={20} className="hidden sm:block" />
                  Nova Tarefa
                </Button>
              </div>
              {tarefas.length === 0 ? (
                <p className="text-gray-400 flex items-center mt-12 justify-center text-sm sm:text-base">
                  Nenhuma tarefa cadastrada.
                </p>
              ) : (
                <div className="space-y-3 sm:space-y-5 w-full">

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
            <div className="flex flex-col w-full lg:w-[65%] bg-neutral min-h-60 rounded-lg shadow-lg p-4 sm:p-6 mt-4 mb-5">
              <div className="flex flex-row mb-4">
                <div className="flex flex-col">
                  <h1 className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-4xl">
                    <IoCalendarClearOutline className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" /> 
                    <span>Anotações e Observações</span>
                  </h1>
                  <h4 className="text-gray-500 mt-1 text-sm sm:text-base">
                    Registre aqui suas anotações e observações rápidas sobre o TCC
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
                    className="p-3 sm:p-4 w-full h-32 sm:h-44 mt-4 bg-gray-300 rounded-sm font-sans font-normal text-black border-gray-100 focus:outline-none text-sm sm:text-base"
                  />

                  <Button
                    variant="primary"
                    onClick={() => salvarNota(notaAtual)}
                    className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 h-10 sm:h-12 w-full sm:w-auto max-w-xs mt-4 text-sm sm:text-base"
                  >
                    <FaPlus size={16} className="sm:hidden" />
                    <FaPlus size={20} className="hidden sm:block" />
                    Adicionar Anotações
                  </Button>

                  {/* impede de adicionar notas vazias */}
                  {erroNota && (
                    <span className="text-red-500 text-xs sm:text-sm mt-4">{erroNota}</span>
                  )}
                </div>

                {/* Se não houver notas, exibe mensagem */}
                <div className="mt-4 overflow-y-visible">
                  {listaNota.length === 0 ? (
                    <p className="text-gray-400 flex items-center mt-8 justify-center text-sm sm:text-base">
                      Nenhuma anotação cadastrada.
                    </p>
                  ) : (
                    /* Mapeia e renderiza cada nota da lista */
                    listaNota.map((nota, i) => (
                      <div key={i} className="bg-gray-300 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                        <div className="bg-gray-200 min-h-[100px] sm:h-32 flex justify-between p-3 sm:px-4 sm:py-4 rounded-md shadow-sm">
                          <div className="flex justify-between w-full">
                            <div className="flex flex-col flex-1 mr-2">
                              <p className="whitespace-pre-wrap break-words font-semibold text-gray-800 text-sm sm:text-base">
                                • {nota.texto}
                              </p>
                              <span className="text-xs sm:text-sm text-gray-600 mt-auto pt-2 border-t">
                                {nota.data}
                              </span>
                            </div>
                            <Button variant="edit" onClick={() => {removerNota(nota.id)}} className="h-8 w-8 sm:h-10 sm:w-10 p-1">
                              <FaTrashCan size={16} className="sm:hidden" />
                              <FaTrashCan size={20} className="hidden sm:block" />
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
          <div className="flex flex-col w-full lg:w-[35%] order-first lg:order-last">
            {/* Cronograma */}
            <div className="flex flex-col bg-neutral min-h-60 sm:min-h-72 mt-4 rounded-lg shadow-lg mb-5 p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Cronograma</h1>

              {/* Datas */}
              <div className="flex flex-col text-sm sm:text-lg lg:text-xl text-[#9ea09d] gap-6 sm:gap-8 lg:gap-12 mt-3 sm:mt-5">

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

                <div className="flex justify-between">
                  <span>Dias restantes:</span>
                  <span className="text-[#252525] font-semibold">
                    {diasRestantes !== null ? diasRestantes : "—"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="border-t mt-4 border-gray-200">
                {status && (
                  <span
                    className="text-sm sm:text-lg lg:text-xl font-bold mt-5 rounded-lg text-center p-2 sm:p-1 flex justify-center items-center min-h-[2rem] sm:min-h-[2.5rem]"
                    style={{
                      color: status.cor,
                      backgroundColor: status.colorBackground,
                    }}
                  >
                    {status.nome}
                  </span>
                )}
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="bg-neutral min-h-60 sm:min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Ações Rápidas</h1>
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-7 mt-3">
                <Button variant="quicks" className="px-3 sm:px-5 py-2 h-10 sm:h-12 flex items-center gap-2 text-sm sm:text-base">
                  <CiEdit size={20} className="sm:hidden" />
                  <CiEdit size={25} className="hidden sm:block" />
                  Editar TCC
                </Button>

                <Button variant="quicks" className="px-3 sm:px-5 py-2 h-10 sm:h-12 flex items-center gap-2 text-sm sm:text-base" onClick={() => navigate("/criar-atividade") }>
                  <FaPlus size={20} className="sm:hidden" />
                  <FaPlus size={25} className="hidden sm:block" />
                  Nova tarefa
                </Button>

                <Button 
                  variant="quicks" 
                  className="px-3 sm:px-5 py-2 h-10 sm:h-12 flex items-center gap-2 text-sm sm:text-base"
                  onClick={() => navigate("/agendar-reuniao")}
                >
                  <RiCalendarScheduleLine size={20} className="sm:hidden" />
                  <RiCalendarScheduleLine size={25} className="hidden sm:block" />
                  Agendar Reunião
                </Button>

                <Button variant="quicks" className="px-3 sm:px-5 py-2 h-10 sm:h-12 flex items-center gap-2 text-sm sm:text-base">
                  <HiOutlineNewspaper size={20} className="sm:hidden" />
                  <HiOutlineNewspaper size={25} className="hidden sm:block" />

                  Gerar Relatório
                </Button>
              </div>
=======

function MainDashboard() {
=======
import useTitle from "@/hooks/useTitle";
import useAuth from "../auth/context/useAuth";

function MainDashboard() {
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
  // Simula as datas do backend com useState e useEffect
  const [dataInicio] = useState<string | null>(null);
  const [dataEntrega] = useState<string | null>(null);

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const navigate = useNavigate();

  // Access authentication context
  const { logout, user } = useAuth();

  useTitle("FocoTCC - Dashboard");

>>>>>>> 2761d5f (refatora componentes de autenticação)
  
// Usa hook para calcular dias restantes só se datas existirem 
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });
  // Busca dados dos outros hooks
  const { title, aluno, curso, orientador, coorientador } = InfosTCC();
  const { progress, description } = useGeneralProgress();
  const { checked, total, descriptionM } = useCompletedMarks();
  const { pending, descriptionP } = usePendingTasks();
  const { late, descriptionL } = useLateTasks();
  const status  = useStatusTheme();
  

<<<<<<< HEAD
  // Define título da página
  useEffect(() => {
    document.title = 'FocoTCC - Dashboard';
  }, []);


=======
  // Função para fazer logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
=======
  // Set page title on mount
  useTitle("FocoTCC - Dashboard Principal");

  // Usa hook para calcular dias restantes só se datas existirem
  const diasRestantes = useCronograma({ dataInicio, dataEntrega });
  // Busca dados dos outros hooks

  const status = useStatusTheme();
  const { tccData, loading } = useTCCData();

  const { logout, user } = useAuth();
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3C50D]">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }
<<<<<<< HEAD
>>>>>>> 2761d5f (refatora componentes de autenticação)
  
=======

>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
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
<<<<<<< HEAD
<<<<<<< HEAD
          <h1 className="text-4xl font-sans font-bold">{tccData?.title || title}</h1>
          <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-600">
            <IoPersonOutline /> Aluno: {tccData?.aluno || aluno} • {tccData?.curso || curso}
=======
          <h1 className="text-4xl font-sans font-bold">
            {tccData?.title || title}
          </h1>
          <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-600">
            <IoPersonOutline /> Aluno: {tccData?.aluno || aluno} •{" "}
            {tccData?.curso || curso}
>>>>>>> 2761d5f (refatora componentes de autenticação)
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
            <IoBookOutline /> Orientador: {tccData?.orientador || orientador}
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
<<<<<<< HEAD
            <FaUserFriends /> Coorientador: {tccData?.coorientador || coorientador}
=======
            <FaUserFriends /> Coorientador:{" "}
            {tccData?.coorientador || coorientador}
>>>>>>> 2761d5f (refatora componentes de autenticação)
=======
          <h1 className="text-4xl font-sans font-bold">{tccData?.title}</h1>
          <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-600">
            <IoPersonOutline /> Aluno: {tccData?.aluno} • {tccData?.curso}
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
            <IoBookOutline /> Orientador: {tccData?.orientador}
          </h2>
          <h2 className="flex items-center gap-2 text-2xl text-gray-600">
            <FaUserFriends /> Coorientador: {tccData?.coorientador}
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
          </h2>
        </div>
      </div>

      {/* Summary cards */}
      <div className="flex flex-row items-center justify-between w-[85%] min-h-40 mt-4 gap-5">
        {/* Progress card */}
        <div className="flex flex-col items-center justify-center w-full bg-[#fffbef] rounded-lg shadow-lg p-4">
          <span className="flex gap-2 items-center text-4xl font-bold">
            <IoMdTrendingUp className="w-12 h-12 bg-[#dbeafe] rounded-md p-1" />
            {tccData?.progress || progress}%
          </span>
<<<<<<< HEAD
          <span className="text-2xl text-[#9ea09d]">{description}</span>
=======
          <span className="text-2xl text-[#9ea09d]">
            Progresso geral do TCC
          </span>
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
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
            <div className="bg-[#fffbef] min-h-80 mt-1 rounded-lg shadow-lg mb-5 p-6">
              <h1 className="text-3xl font-bold">Ações Rápidas</h1>
<<<<<<< HEAD
>>>>>>> 742fd03 (refatora estrutura de autenticação, adiciona componentes de contêiner e página de login)
=======
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
>>>>>>> 1462c08 (resolvendo conflitos de arquivos)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
