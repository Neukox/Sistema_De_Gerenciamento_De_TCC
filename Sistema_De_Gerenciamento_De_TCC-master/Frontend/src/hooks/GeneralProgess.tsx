import { useState, useEffect } from "react";

interface GeneralProgressProps {

    progress: number;
    description: string;
}


export function useGeneralProgress() {

    const [progress, setProgress] = useState<GeneralProgressProps>({
      progress: 0,
        description: ''  
    });


    useEffect (()=> {
        const fetchprogress = {
            progress: 65,
            description: 'Progresso geral do TCC'
        };
        setProgress(fetchprogress);
    }, []);
    
  return progress;
}; 
