import React from "react";

function EditarTCC() {
  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
          <h1 className="text-2xl font-bold text-center">FocoTCC</h1>
          <p className="text-sm text-gray-500 text-center">Editar TCC</p>
          <p className="text-sm text-gray-500 text-center mt-1">
            Edite as informações do seu trabalho de conclusão de curso!
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título do TCC</label>
            <input
              type="text"
              placeholder="Digite o título do seu TCC"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tema do TCC</label>
            <input
              type="text"
              placeholder="Digite o tema do seu TCC"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Área do Conhecimento</label>
            <select className="w-full mt-1 p-2 border rounded-md">
              <option>Ciências Humanas</option>
              <option>Ciências Exatas</option>
              <option>Ciências Biológicas</option>
              <option>Engenharias</option>
              <option>Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Curso</label>
            <input
              type="text"
              placeholder="Digite o nome do seu curso"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Orientador</label>
            <input
              type="text"
              placeholder="Digite o nome do seu orientador"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Coorientador</label>
            <input
              type="text"
              placeholder="Digite o nome do seu coorientador (opcional)"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Resumo/Descrição</label>
            <textarea
              placeholder="Digite um resumo ou descrição do seu TCC"
              className="w-full mt-1 p-2 border rounded-md resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data de início</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-md"
              defaultValue="2222-02-22"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data de conclusão</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status Atual</label>
            <select className="w-full mt-1 p-2 border rounded-md">
              <option>Desenvolvimento</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

