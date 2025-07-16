import {
  DropdownMenu,            // Container geral do menu dropdown
  DropdownMenuContent,     // O conteúdo que aparece quando o dropdown é aberto
  DropdownMenuItem,        // Cada item individual clicável do dropdown
  DropdownMenuTrigger,     // Define o gatilho (botão) que ativa o dropdown
} from "../ui/dropdown-menu";

import Button from "../ui/Button";

import ProgressBar from "./ProgressBar";

import { LuPencilLine } from "react-icons/lu";


// Importa os ícones de status (ícones visuais baseados no status atual da tarefa)
import { StatusIcon } from "../card/StatusIcon";

// Função utilitária que retorna as cores associadas ao status (ex: cor do texto e do fundo)
import { getStatusColor, StatusColor } from "@/utils/StatusColor";

// Hook do React para manipular estado interno do componente
import { useEffect, useState } from "react";

// Tipagem para os ícones do react-icons (ícones dinâmicos)
import type { IconType } from "react-icons";

import { parsePrazo } from "./ParsePrazo"; // Função que converte string do prazo para objeto Date

// Tipagem das propriedades que o componente MarksCard recebe
interface TarefaCardProps {
  id: number;          // Identificador único da tarefa (ex: #1)
  title: string;       // Título da tarefa
  description: string; // Descrição detalhada da tarefa
  prazo: string;       // Prazo da tarefa, em formato string (ex: "dd-mm-aaaa")
  stats: string;       // Status atual da tarefa (ex: "desenvolvimento", "pendente")
  mostrar?: boolean; // Estado opcional para mostrar ou não o card
  mostrarEditar?: boolean; // Estado opcional para mostrar ou não o botão de editar
} 

// Componente funcional principal que renderiza o "card" de uma tarefa/marco do projeto
const MarksCard = ({ id, title, description, prazo, stats, mostrar, mostrarEditar }: TarefaCardProps) => {
  // Estado que guarda o status atual da tarefa em letras minúsculas
  // Inicializado com o valor vindo da props "stats"
  const [statusAtual, setStatusAtual] = useState(stats.toLowerCase());
   const [statusAnterior, setStatusAnterior] = useState(stats.toLowerCase());

  // Estado booleano que indica se a tarefa está atrasada (true) ou não (false)
  const [estaAtrasado, setEstaAtrasado] = useState(false);
  const progressoStatus = statusAtual === "atrasado" ? statusAnterior : statusAtual;
  const [dataConcluida, setDataConcluida] = useState<string | null>(null);

  // useEffect é executado sempre que o prazo mudar
  useEffect(() => {
    const hoje = new Date();               // Data atual (dia/hora exatos)
    const dataPrazo = parsePrazo(prazo);  // Converte string "prazo" para objeto Date
    
    const isAtrasado = dataPrazo < hoje; // Verifica se o prazo é menor que hoje
  
    // Se a data do prazo for menor que hoje, quer dizer que passou do prazo
    if (isAtrasado) {
      setEstaAtrasado(true);   
      setStatusAtual ("atrasado")    // Marca a tarefa como atrasada
    } else {
      setEstaAtrasado(false);  
      if ( isAtrasado && statusAtual === "atrasado") {
        setStatusAtual(statusAnterior); // Se estava atrasada, volta ao status anterior
      }
    }
  }, [prazo, statusAtual, statusAnterior]);  // Executa toda vez que a prop "prazo" mudar

  // Função que altera o status atual da tarefa, chamada quando o usuário seleciona um status no dropdown
  const handleStatusChange = (newStats: string) => {
    setStatusAtual(newStats);
    setStatusAnterior(newStats);

    if (newStats === "concluído") {
      const hoje = new Date();
      const dataFormatada = hoje.toLocaleDateString("pt-BR");
      setDataConcluida(dataFormatada); // Armazena a data de conclusão
    } else {
      setDataConcluida(null); // Reseta a data de conclusão se não for "concluído"
    }
  };

  // Obtém as cores (texto e fundo) relacionadas ao status atual usando a função utilitária
  // Isso serve para colorir visualmente o card conforme o status da tarefa
  const { cor, colorBackground } = getStatusColor(statusAtual);

  // Pega o ícone correspondente ao status atual da tarefa (ícones definidos no StatusIcon)
  const Icon = StatusIcon[statusAtual];


  const getPercentByStatus = (status: string): number  => {
    switch (status) {
      case "pendente":
      return 0; // Pendente não tem progresso
      case "desenvolvimento":
        return 50; // Em desenvolvimento tem 50% de progresso
      case "concluído":
        return 100; // Concluído tem 100% de progresso
         default:
          return 0;// Concluído tem 100% de progresso  
        
    }
  }

  return (
    // Container principal do card, com borda, sombra e espaçamento
    <div className="border border-gray-300 w-full min-h-40 rounded-md p-7 mt-5 shadow-lg">
      
      {/* Parte superior do card com ID, título e dropdown ou indicação de atraso */}
      <div className="border-b">
        <div className="flex flex-row items-center gap-4 ">
          
          {/* Número de identificação da tarefa, mostrado com # antes */}
          <h1 className="text-gray-600 text-xl">#{id}</h1>

          {/* Título da tarefa, em destaque */}
          <p className="text-xl font-semibold text-gray-800">{title}</p>

          {/* Se a tarefa está atrasada, mostra o status fixo com cor e ícone, sem dropdown */}
          {estaAtrasado ? (
            <div
              className="flex items-center font-bold gap-2 px-3 py-1 rounded-md shadow-md focus:outline-none text-sm "
              style={{ color: cor, backgroundColor: colorBackground }}
            >
              {/* Ícone do status atrasado */}
              {Icon && <Icon size={18} />}
              {/* Texto do status atual com primeira letra maiúscula */}
              {statusAtual.charAt(0).toUpperCase() + statusAtual.slice(1)}
            </div>
          ) : (
            <>
              {/* Caso não esteja atrasada, renderiza o Dropdown para alterar o status */}
              <DropdownMenu >
                {/* O gatilho do dropdown é um botão que mostra o status atual colorido */}
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-3 py-1 rounded-md shadow-md focus:outline-none text-sm font-bold"
                    style={{ color: cor, backgroundColor: colorBackground }} // Cor dinâmica conforme status
                  >
                    {/* Ícone do status atual, se existir */}
                    {Icon && <Icon size={18} />}
                    {/* Texto do status atual com primeira letra maiúscula */}
                    {statusAtual.charAt(0).toUpperCase() + statusAtual.slice(1)}
                  </button>
                </DropdownMenuTrigger>

                {/* Conteúdo do dropdown com opções para alterar status */}
                <DropdownMenuContent
                  side="bottom"          // Mostra o menu abaixo do botão
                  align="center"         // Alinha o menu ao centro do botão
                  className="bg-white z-50" // Fundo branco e z-index para sobrepor
                  sideOffset={8}         // Espaço entre botão e dropdown
                >
                  {/* Mapeia os status possíveis, exceto "atrasado" que é tratado separado */}
                  {Object.entries(StatusColor)
                    .filter(([Key]) => Key !== "atrasado")
                    .map(([key]) => {
                      // Para cada status, pega o ícone correspondente
                      const ItemIcon: IconType | undefined = StatusIcon[key];

                      return (
                        <DropdownMenuItem
                          key={key}                          // Chave única para React
                          onClick={() => handleStatusChange(key)} // Ao clicar, altera o status
                          className="flex items-center gap-2 cursor-pointer font-medium hover:bg-gray-200"
                        >
                          {/* Ícone do status */}
                          {ItemIcon && <ItemIcon size={18} />}
                          {/* Texto com primeira letra maiúscula */}
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {mostrarEditar && ( 
          <Button className={`border-none ml-auto `}
          variant="edit">
          <LuPencilLine size={20}  />
          </Button>
        )}
        </div>

        {/* Parte inferior do card com descrição da tarefa e prazo */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Texto da descrição da tarefa */}
          <p>{description}</p>
          {/* Exibe o prazo da tarefa formatado como string */}
          <div className="flex flex-row items-center gap-2 mb-4"> 
            <p className="text-sm font-medium text-gray-500 mb-1">Prazo: {prazo}</p>
            {statusAnterior === "concluído" && (dataConcluida !== null) && (
            <p className="text-sm font-medium text-gray-500 mb-1">Concluída: {dataConcluida}</p>)}
          </div>
        </div>
      </div>
      
        {/* Barra de progresso que mostra o andamento da tarefa */}
        {mostrar && ( 
         <>
         <span className="flex mb-3 justify-end pr-3">{getPercentByStatus(progressoStatus)}%</span>
         <ProgressBar percent={  getPercentByStatus(progressoStatus)} /> 
         </>
        )}
      
    </div>
  );
};

export default MarksCard;
