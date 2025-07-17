import {  useState } from "react"

type Nota = {
    texto: string,
    data: string,
    id: string
};


export function useNotes() {
   const [notaAtual, setNotaAtual] = useState<string>("");
   const [listaNota, setListaNota] = useState<Nota[]>([]);
   const [erroNota, setErroNota] = useState<string | null>(null);
   
   const salvarNota = (nota: string) => {
    const textoLimpo = nota.trim();
    if (!textoLimpo ) {
        setErroNota("Digite uma anotação antes de adicionar."); // define erro
      return;
    } 

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }) 
    
    const novaNota = {
        id: String(Date.now()), 
        texto: textoLimpo,
        data: dataFormatada,
    };


       setListaNota(prev => [ novaNota, ...prev]); // Adiciona a nova nota à lista
      setNotaAtual(""); // Limpa o campo de entrada após salvar
     setErroNota(null);
   }


   const removerNota = (id: string) => {
    setListaNota(prev => prev.filter(nota => nota.id !== id)); 
}
   
    return { notaAtual, setNotaAtual, listaNota, salvarNota, erroNota, removerNota }; // Retorna dados/funções
}