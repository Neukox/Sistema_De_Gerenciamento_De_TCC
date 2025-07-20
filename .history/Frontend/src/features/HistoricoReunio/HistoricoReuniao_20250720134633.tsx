import React from "react";
import { useNavigate } from "react-router-dom";
import { useReunioes } from "@/context/useReunioes";
import type { ReuniaoWithTCC } from "@/types/reuniao";
import logo from "@/assets/logo.png"; // Importando logo se necessário

export default function HistoricoReunioes() {
  // O histórico agora só exibe reuniões do contexto global
  const { reunioes, atualizarReunioes } = useReunioes();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    atualizarReunioes()
      .catch(() => setError("Erro ao carregar reuniões. Verifique sua conexão ou tente novamente."))
      .finally(() => setLoading(false));
  }, [atualizarReunioes]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-start py-10 px-4">
      <div className="bg-white max-w-2xl w-full rounded-xl p-6 space-y-6 shadow-md">
        {/* Voltar */}
        <div className="text-sm text-black cursor-pointer hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</div>

        {/* Logo + Título */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-gray-200 rounded-sm mb-2"></div>
          <span className="font-semibold">FocoTCC</span>
          <h1 className="text-2xl font-bold mt-2">Histórico de Reuniões</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize o histórico de todas as reuniões agendadas para o seu TCC.</p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500">Carregando reuniões...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : Array.isArray(reunioes) && reunioes.length === 0 ? (
            <div className="text-center text-gray-500">Nenhuma reunião agendada.</div>
          ) : Array.isArray(reunioes) ? (
            reunioes.map((meeting: ReuniaoWithTCC, index: number) => (
              <div key={index} className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-900">{meeting.titulo ?? 'Sem título'}</h3>
                <p className="text-sm text-gray-600 mt-1">{meeting.descricao ?? ''}</p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Data e Hora:</span> {meeting.data_agendada ? new Date(meeting.data_agendada).toLocaleString('pt-BR') : 'Não informada'}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Observações:</span> {meeting.observacoes ?? ''}
                </p>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}
