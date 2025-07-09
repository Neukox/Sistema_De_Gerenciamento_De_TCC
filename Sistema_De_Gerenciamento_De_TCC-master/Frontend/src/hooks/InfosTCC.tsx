import {useEffect, useState } from "react"

interface InfosTCCProps {
    title: string;
    aluno: string;
    curso: string;
    orientador: string;
    coorientador: string;
    
}    


export function InfosTCC() {


    const [ infosTCC, setInfosTCC ] = useState<InfosTCCProps>({
        title: '',
        aluno: '',
        curso: '',
        orientador: '',
        coorientador: '',

    });

    useEffect (() => {
       
      const fetchInfosTCC  = {
        title: 'Sistema baseado em React para gerenciamento de TCC',
        aluno: 'Davi Bastos',
        curso: 'Engenharia de Software',
        orientador: 'Dra. Maria Oliveira',
        coorientador: " Prof. Ana Souza",
        };


     setInfosTCC(fetchInfosTCC);
    }, []);



return infosTCC;


};





