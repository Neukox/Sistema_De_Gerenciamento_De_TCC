// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecuperacaoSenha from "./pages/auth/ResetPassword";
import { ConfirmResetPassword } from "./pages/auth/ConfirmResetPassword";
import { HistoricoAtividades } from "../src/features/Historico/HistoricoAtividades";
import EditarTCC from "./features/EditarTCC/EditarTCC";
import UserProfile from "./features/Profile/UserProfile";
import { CadastrarTcc } from "./pages/CadastrarTcc";
import { BoasVindas } from "./pages/BoasVindas";
import { AgendarReuniao } from "./pages/AgendarReuniao";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTCCById, fetchAreasConhecimento } from "./features/TCC/services/fetchTCC";

function EditarTCCWrapper() {
  const { id } = useParams();
  const [tccData, setTccData] = useState(null);
  const [areasConhecimento, setAreasConhecimento] = useState([]);
  useEffect(() => {
    if (id) {
      fetchTCCById(id).then(setTccData);
      fetchAreasConhecimento().then(setAreasConhecimento);
    }
  }, [id]);
  if (!tccData || areasConhecimento.length === 0) {
    return <div>Carregando...</div>;
  }
  return <EditarTCC tccData={tccData} areasConhecimento={areasConhecimento} />;
}

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
              <EditarTCCWrapper />
            </ProtectedRoute>
          }
        />
// Wrapper para buscar dados do TCC e áreas de conhecimento
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTCCById, fetchAreasConhecimento } from "./features/TCC/services/fetchTCC";

function EditarTCCWrapper() {
  const { id } = useParams();
  const [tccData, setTccData] = useState(null);
  const [areasConhecimento, setAreasConhecimento] = useState([]);
  useEffect(() => {
    if (id) {
      fetchTCCById(id).then(setTccData);
      fetchAreasConhecimento().then(setAreasConhecimento);
    }
  }, [id]);
  if (!tccData || areasConhecimento.length === 0) {
    return <div>Carregando...</div>;
  }
  return <EditarTCC tccData={tccData} areasConhecimento={areasConhecimento} />;
}
      </Routes>
    </div>
  );
}
