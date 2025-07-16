// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainDashboard from "./features/Dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecuperacaoSenha from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ConfirmResetPassword } from "./pages/auth/ConfirmResetPassword";
import { CadastrarTcc } from "./pages/auth/CadastrarTcc";
import { BoasVindas } from "./pages/auth/BoasVindas";
import { AgendarReuniao } from "./pages/auth/AgendarReuniao";

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
      
      {/* Protected Routes */}
      <Route
        path="/maindashboard"
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
