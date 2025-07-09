import { useState, useEffect } from "react";


interface PendingTasks {
    pending: number;
    descriptionP: string;
};

export function usePendingTasks() {
    
    const [task, setTask] = useState<PendingTasks>({
        pending: 0,
        descriptionP: ""
     });
    
     useEffect(() => {
        const fetchTasks = { 
            pending: 3,
            descriptionP: "Tarefas pendentes"
        }
        
        setTask(fetchTasks);
     }, []);
   
     
return task;
}