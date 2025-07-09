import { useState,useEffect } from "react";


interface CompletedMarks {
    checked: number;
    total: number;
    descriptionM: string;
}


export function useCompletedMarks() {
   
    const [marks, setMarks] = useState<CompletedMarks>({ 
        checked: 0,
        total: 0,
        descriptionM: ""
    });

    useEffect(() => {
        const fetchMarks = {
            checked: 5,
            total: 10,
            descriptionM: "Marcos concluídos"
        };
        setMarks(fetchMarks);
    }, []);



 return marks;
};