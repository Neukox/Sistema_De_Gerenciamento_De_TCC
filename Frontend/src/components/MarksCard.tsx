import {
  DropdownMenu,            // Container geral do menu dropdown
  DropdownMenuContent,     // O conteúdo que aparece quando o dropdown é aberto
  DropdownMenuItem,        // Cada item individual clicável do dropdown
  DropdownMenuTrigger,     // Define o gatilho (botão) que ativa o dropdown
} from "../components/ui/dropdown-menu";

// Importa os ícones de status (ícones visuais baseados no status atual da tarefa)
import { StatusIcon } from "./StatusIcon";

// Função utilitária que retorna as cores associadas ao status (ex: cor do texto e do fundo)
import { getStatusColor, StatusColor } from "@/utils/StatusColor";

// Hook do React para manipular estado interno do componente
import { useState } from "react";

// Tipagem para os ícones do react-icons (ícones dinâmicos)
import type { IconType } from "react-icons";

// Tipagem das propriedades que o componente MarksCard recebe
interface TarefaCardProps {
  id: number;        // Identificador da tarefa (ex: #1)
  title: string;     // Título da tarefa
  description: string; // Descrição da tarefa
  prazo: string;     // Prazo da tarefa (data limite)
  stats: string;     // Status atual da tarefa (ex: "desenvolvimento", "pendente", etc)
}

// Componente funcional principal que renderiza o "card" de uma tarefa/marco do projeto
const MarksCard = ({ id, title, description, prazo, stats }: TarefaCardProps) => {
  // Hook de estado que armazena o status atual da tarefa em letras minúsculas
  const [statusAtual, setStatusAtual] = useState(stats.toLowerCase());

  // Pega a cor do texto e do fundo conforme o status atual
  const { cor, colorBackground } = getStatusColor(statusAtual);

  // Pega o ícone correspondente ao status atual
  const Icon = StatusIcon[statusAtual];

  return (
    // Container do card inteiro
    <div className="border border-gray-300 w-full min-h-40 rounded-md p-7 mt-5 shadow-lg">
      
      {/* Parte superior do card com ID, título e dropdown */}
      <div className="border-b">
        <div className="flex flex-row items-center gap-4">
          
          {/* Número de identificação da tarefa */}
          <h1 className="text-gray-600 text-xl">#{id}</h1>

          {/* Título da tarefa */}
          <p className="text-xl font-semibold text-gray-800">{title}</p>

          {/* Dropdown para alterar o status da tarefa */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Botão que mostra o status atual e abre o dropdown ao ser clicado */}
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-md shadow-md focus:outline-none text-sm font-medium"
                style={{ color: cor, backgroundColor: colorBackground }} // Cores dinâmicas
              >
                {/* Ícone do status atual, se existir */}
                {Icon && <Icon size={18} />}
                
                {/* Texto com primeira letra maiúscula */}
                {statusAtual.charAt(0).toUpperCase() + statusAtual.slice(1)}
              </button>
            </DropdownMenuTrigger>

            {/* Conteúdo do dropdown (opções de status) */}
            <DropdownMenuContent 
              side="bottom"            // Mostra abaixo do botão
              align="center"           // Alinha ao centro
              className="bg-white z-50" // Cor e z-index
              sideOffset={8}           // Espaço entre botão e dropdown
            >
              {/* Mapeia todos os status disponíveis e renderiza como itens no menu */}
              {Object.entries(StatusColor).map(([key]) => {
                // Ícone associado a cada status
                const ItemIcon: IconType | undefined = StatusIcon[key];

                return (
                  <DropdownMenuItem
                    key={key}                          // Chave única para cada item
                    onClick={() => setStatusAtual(key)} // Altera o status ao clicar
                    className="flex items-center gap-2 cursor-pointer font-medium hover:bg-gray-200"
                  >
                    {/* Ícone do status, se existir */}
                    {ItemIcon && <ItemIcon size={18} />}

                    {/* Texto com primeira letra maiúscula */}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Parte inferior do card com descrição e prazo */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Descrição da tarefa */}
          <p>{description}</p>

          {/* Data limite */}
          <p className="text-sm font-medium text-gray-500 mb-1">Prazo: {prazo}</p>
        </div>
      </div>
    </div>
  );
};

export default MarksCard;
