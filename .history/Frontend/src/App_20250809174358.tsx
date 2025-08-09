// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import RequireAuthRoute from "./pages/RequireAuthRoute";
import ProfileLayout from "./pages/layouts/ProfileLayout";
import ProtectedTccRoute from "./pages/ProtectedTccRoute";
import TCCLayout from "./pages/layouts/TCCLayout";

const LoginPage = React.lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/auth/RegisterPage"));
const RecuperacaoSenha = React.lazy(() => import("./pages/auth/ResetPassword"));
const ConfirmResetPassword = React.lazy(
  () => import("./pages/auth/ConfirmResetPassword")
);
const BoasVindas = React.lazy(() => import("./pages/BoasVindas"));
const CadastrarTcc = React.lazy(() => import("./pages/CadastrarTcc"));
const DashboardPage = React.lazy(() => import("./pages/tcc/DashboardPage"));
const ApplyHistoryPage = React.lazy(
  () => import("./pages/tcc/ApplyHistoryPage")
);
const TasksPage = React.lazy(() => import("./pages/tcc/TasksPage"));
const MyTccPage = React.lazy(() => import("./pages/tcc/MyTccPage"));
const NotesPage = React.lazy(() => import("./pages/tcc/NotesPage"));
const MeetingsPage = React.lazy(() => import("./pages/tcc/MeetingsPage"));
const AssistentTCC = React.lazy(
  () => import("./features/AssistentTCC/AssistentTCC")
);
const UserProfilePage = React.lazy(
  () => import("./pages/profile/UserProfilePage")
);

export default function App() {
  return (
    <div className="scrollbar-hide">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
        <Route path="/redefinir-senha" element={<ConfirmResetPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<RequireAuthRoute />}>
          <Route index element={<Navigate to="/boas-vindas" replace />} />
          <Route path="boas-vindas" element={<BoasVindas />} />
          <Route element={<ProfileLayout />}>
            <Route path="perfil" element={<UserProfilePage />} />
          </Route>
          <Route element={<ProtectedRoute roles={["ALUNO"]} />}>
            <Route path="cadastrar-tcc" element={<CadastrarTcc />} />
            <Route element={<ProtectedTccRoute />}>
              <Route element={<TCCLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="historico" element={<ApplyHistoryPage />} />
                <Route path="tarefas" element={<TasksPage />} />
                <Route path="meu-tcc" element={<MyTccPage />} />
                <Route path="anotacoes" element={<NotesPage />} />
                <Route path="reunioes" element={<MeetingsPage />} />
                <Route path="assistente-tcc" element={<AssistentTCC />} />
                {/* Outras rotas do TCC */}
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
