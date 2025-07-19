import { useState } from "react"
import  { arrayCards } from '../components/arrayCards'

// Interface que define o formato dos dados de cada card/tarefa
export interface CardInfos {
    id: number,
    title: string,
    description: string,
    prazo: string,
    stats: string,
}

// Hook customizado que mantém o estado da lista de tarefas
// Inicializa com o arrayCards que simula dados do backend
export function useCard () {
   const [tarefas, setTarefas] = useState<CardInfos[]>(arrayCards)
   // Retorna o estado e função para atualizar as tarefas
   return {tarefas, setTarefas};
};
