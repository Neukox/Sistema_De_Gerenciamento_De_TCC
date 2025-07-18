// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecuperacaoSenha from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ConfirmResetPassword } from "./pages/auth/ConfirmResetPassword";
import { CadastrarTcc } from "../src/features/CadastroTcc/CadastrarTcc";
import { BoasVindas } from "../src/features/BoasVindas/BoasVindas";
import { AgendarReuniao } from "../src/features/AgendarReunião/AgendarReuniao";
import { HistoricoAtividades } from "../src/features/Historico/HistoricoAtividades";
import UserProfile from "./features/Profile/UserProfile";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
      <Route path="/redefinir-senha" element={<ConfirmResetPassword />} />
      <Route path="/cadastrar-tcc" element={<CadastrarTcc />} />
      <Route path="/boas-vindas" element={<BoasVindas />} />
      <Route path="/agendar-reuniao" element={<AgendarReuniao />} />
      <Route path="/historico-atividades" element={<HistoricoAtividades />} />
      <Route path="/perfil" element={<UserProfile />} />

      {/* Public Routes */}

      {/* Redirect to login if no route matches */}
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}