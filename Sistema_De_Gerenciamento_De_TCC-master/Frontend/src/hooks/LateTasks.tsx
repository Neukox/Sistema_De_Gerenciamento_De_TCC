import { useState,useEffect } from "react";

interface LateTasks {
    late: number;
    descriptionL: string;
}

export function useLateTasks() {

    const [task, setTask] = useState<LateTasks>({
        late: 0,
        descriptionL: ""


    });

    useEffect(() => {
        const fetchLateTasks = { 
            late: 2,
            descriptionL: "Tarefas atrasadas"
        }
        setTask(fetchLateTasks);
    },[])
    return task;
}