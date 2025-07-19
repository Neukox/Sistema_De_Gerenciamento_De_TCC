import React from "react";
import useAuth from "@/features/auth/context/useAuth";
import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rotas que requerem autenticação
 * @returns Componente Outlet se o usuário estiver autenticado, ou redireciona para a página de login
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && import.meta.env.VITE_DEV_PROTECT_ROUTES === "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
