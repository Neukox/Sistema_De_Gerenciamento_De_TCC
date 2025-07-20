import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAtividade, AtividadeData } from "../../services/atividadeService";

export default function CriarAtividade() {
  const [atividade, setAtividade] = useState<AtividadeData>({
    nome: "",
    descricao: "",
    data: "",
    prioridade: "Média",
    status: "A Fazer",
    responsavel: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token de autenticação não encontrado");
      // Ajusta o formato para o backend se necessário
      const atividadePayload: AtividadeData = {
        nome: atividade.nome,
        descricao: atividade.descricao,
        data: atividade.data,
        prioridade: atividade.prioridade,
        status: atividade.status,
        responsavel: atividade.responsavel || undefined,
      };
      await criarAtividade(atividadePayload, token);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Erro ao criar atividade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-lg shadow-md p-6 space-y-5"
      >
        {/* Logo + título */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-gray-200 rounded-sm mb-2"></div>
          <h1 className="text-xl font-bold">FocoTCC</h1>
          <p className="text-sm text-gray-600 mt-1">
            Criar Nova Atividade do TCC<br />
            Registre as tarefas que precisam ser concluídas para o seu trabalho.
          </p>
        </div>

        {/* Nome da Atividade */}
        <div>
          <label className="block text-sm font-medium">Nome da Atividade</label>
          <input
            type="text"
            name="nome"
            placeholder="Ex: Pesquisar bibliografia, Escrever introdução"
            className="w-full mt-1 p-2 border rounded-md text-sm"
            value={atividade.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            name="descricao"
            placeholder="Detalhes sobre a atividade e o que precisa ser feito."
            className="w-full mt-1 p-2 border rounded-md text-sm"
            rows={3}
            value={atividade.descricao}
            onChange={handleChange}
            required
          />
        </div>

        {/* Data de Conclusão */}
        <div>
          <label className="block text-sm font-medium">Data de Conclusão</label>
          <input
            type="date"
            name="data"
            className="w-full mt-1 p-2 border rounded-md text-sm"
            value={atividade.data}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prioridade */}
        <div>
          <label className="block text-sm font-medium">Prioridade</label>
          <select
            name="prioridade"
            className="w-full mt-1 p-2 border rounded-md text-sm"
            value={atividade.prioridade}
            onChange={handleChange}
          >
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            className="w-full mt-1 p-2 border rounded-md text-sm"
            value={atividade.status}
            onChange={handleChange}
          >
            <option>A Fazer</option>
            <option>Em Progresso</option>
            <option>Concluído</option>
          </select>
        </div>

        {/* Responsável */}
        <div>
          <label className="block text-sm font-medium">Responsável (Opcional)</label>
          <input
            type="text"
            name="responsavel"
            placeholder="Nome do responsável pela tarefa"
            className="w-full mt-1 p-2 border rounded-md text-sm"
            value={atividade.responsavel}
            onChange={handleChange}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Criar Atividade
        </button>
      </form>
    </div>
  );
}
