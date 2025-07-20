import React from "react";
import logo from "@/assets/logo.png";


export default function HistoricoReunioes() {
  const meetings = [
    {
      title: "Reunião de Orientação - Fase 1",
      description: "Discussão inicial sobre o tema do TCC e definição dos objetivos.",
      date: "15/03/2024 - 10:00",
      notes: "Escolha do tema, cronograma preliminar, bibliografia inicial.",
    },
    {
      title: "Reunião de Acompanhamento - Capítulo 1",
      description: "Revisão do primeiro capítulo e feedback sobre a escrita.",
      date: "01/04/2024 - 14:30",
      notes: "Estrutura do capítulo, clareza da argumentação, referências.",
    },
    {
      title: "Reunião de Planejamento - Coleta de Dados",
      description: "Definição da metodologia de coleta de dados e ferramentas.",
      date: "20/04/2024 - 09:00",
      notes: "Questionários, entrevistas, software de análise.",
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-start py-10 px-4">
      <div className="bg-white max-w-2xl w-full rounded-xl p-6 space-y-6 shadow-md">
        {/* Voltar */}
        <div className="text-sm text-black cursor-pointer hover:underline">&larr; Voltar</div>

        {/* Logo + Título */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-gray-200 rounded-sm mb-2"></div>
          <span className="font-semibold">FocoTCC</span>
          <h1 className="text-2xl font-bold mt-2">Histórico de Reuniões</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize o histórico de todas as reuniões agendadas para o seu TCC.</p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <div key={index} className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">{meeting.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Data e Hora:</span> {meeting.date}
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Observações:</span> {meeting.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
