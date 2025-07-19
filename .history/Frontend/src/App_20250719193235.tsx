
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecuperacaoSenha from "./pages/auth/ResetPassword";
import { ConfirmResetPassword } from "./pages/auth/ConfirmResetPassword";
import { HistoricoAtividades } from "../src/features/Historico/HistoricoAtividades";
import UserProfile from "./features/Profile/UserProfile";
import { CadastrarTcc } from "./pages/CadastrarTcc";
import { BoasVindas } from "./pages/BoasVindas";
import { AgendarReuniao } from "./pages/AgendarReuniao";
import ProtectedRoute from "./pages/ProtectedRoute";
import {EditarTCC} from "src/features/EditarTCC/"


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
        <Route path="/editar-tcc/:id" element={<EditarTCC />} />

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
        {/* Rota de edição de TCC removida conforme solicitado */}
      </Routes>
    </div>
  );
}
