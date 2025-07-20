import { useState, useEffect } from "react"
import { fetchAtividades } from '../services/fetchAtividades'
import type { AtividadeBackend } from '../services/fetchAtividades'

// Interface que define o formato dos dados de cada card/tarefa
export interface CardInfos {
    id: number;
    title: string;
    description: string;
    prazo: string;
    stats: string;
}

// Hook customizado que mantém o estado da lista de tarefas
export function useCard () {
   const [tarefas, setTarefas] = useState<CardInfos[]>([]);

   useEffect(() => {
     const fetchData = async () => {
       const token = localStorage.getItem('token');
       if (!token) return;
       try {
         const atividades: AtividadeBackend[] = await fetchAtividades(token);
         // Converter atividades do backend para CardInfos
         const cards = atividades.map((a) => ({
           id: a.id,
           title: a.nome,
           description: a.descricao,
           prazo: a.dataEntrega || a.data_entrega || '',
           stats: a.status || '',
         }));
         setTarefas(cards);
       } catch (err) {
         // Pode adicionar tratamento de erro se quiser
       }
     };
     fetchData();
   }, []);

   return {tarefas, setTarefas};
};
