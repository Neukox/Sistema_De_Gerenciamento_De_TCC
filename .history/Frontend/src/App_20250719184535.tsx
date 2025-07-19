// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecuperacaoSenha from "./pages/auth/ResetPassword";
import { ConfirmResetPassword } from "./pages/auth/ConfirmResetPassword";
import { HistoricoAtividades } from "../src/features/Historico/HistoricoAtividades";
import EditarTCC from "./features/EditarTCC/EditarTCC";
import EditarTCCWrapper from "./features/EditarTCC/EditarTCCWrapper";
import UserProfile from "./features/Profile/UserProfile";
import { CadastrarTcc } from "./pages/CadastrarTcc";
import { BoasVindas } from "./pages/BoasVindas";
import { AgendarReuniao } from "./pages/AgendarReuniao";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <div className="scrollbar-hide">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
        <Route path="/redefinir-senha" element={<ConfirmResetPassword />} />
        <Route path="/cadastrar-tcc" element={<CadastrarTcc />} />
        <Route path="/boas-vindas" element={<BoasVindas />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendar-reuniao"
          element={
            <ProtectedRoute>
              <AgendarReuniao />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historico-atividades"
          element={
            <ProtectedRoute>
              <HistoricoAtividades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* Rota protegida para edição de TCC */}
        <Route
          path="/editar-tcc/:id"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center bg-yellow-400">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
                  <div className="mb-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center"></div>
                    <h1 className="text-2xl font-bold text-center">FocoTCC</h1>
                    <h2 className="text-lg font-semibold text-center mt-2">Editar TCC</h2>
                    <p className="text-gray-600 text-center text-sm mt-1">Edite as informações do seu trabalho de conclusão de curso!</p>
                  </div>
                  <form className="w-full">
                    <div className="mb-4">
                      <label htmlFor="titulo" className="font-semibold">Título do TCC</label>
                      <input id="titulo" type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Digite o título do seu TCC" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="tema" className="font-semibold">Tema do TCC</label>
                      <input id="tema" type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Digite o tema do seu TCC" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="areaConhecimento" className="font-semibold">Área do Conhecimento</label>
                      <select id="areaConhecimento" className="w-full border rounded px-3 py-2 mt-1">
                        <option value="">Selecione a área do conhecimento</option>
                        <option value="Ciências Humanas">Ciências Humanas</option>
                        <option value="Ciências Exatas">Ciências Exatas</option>
                        <option value="Ciências Biológicas">Ciências Biológicas</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="curso" className="font-semibold">Curso</label>
                      <input id="curso" type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Digite o nome do seu curso" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="orientador" className="font-semibold">Orientador</label>
                      <input id="orientador" type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Digite o nome do seu orientador" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="coorientador" className="font-semibold">Coorientador</label>
                      <input id="coorientador" type="text" className="w-full border rounded px-3 py-2 mt-1" placeholder="Digite o nome do seu coorientador (opcional)" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="resumo" className="font-semibold">Resumo/Descrição</label>
                      <textarea id="resumo" className="w-full border rounded px-3 py-2 mt-1" rows={5} placeholder="Digite um resumo ou descrição do seu TCC"></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="dataInicio" className="font-semibold">Data de início</label>
                      <input id="dataInicio" type="date" className="w-full border rounded px-3 py-2 mt-1" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="dataConclusao" className="font-semibold">Data de conclusão</label>
                      <input id="dataConclusao" type="date" className="w-full border rounded px-3 py-2 mt-1" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="statusAtual" className="font-semibold">Status Atual</label>
                      <select id="statusAtual" className="w-full border rounded px-3 py-2 mt-1">
                        <option value="">Selecione o status atual do TCC</option>
                        <option value="Planejamento">Planejamento</option>
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    </div>
                    <div className="mb-4 text-center text-sm text-gray-500">
                      (<span className="text-red-600">*</span>) Campos obrigatórios
                    </div>
                    <div className="mb-2">
                      <button type="submit" className="w-full bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-800">Salvar Alterações</button>
                    </div>
                  </form>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
