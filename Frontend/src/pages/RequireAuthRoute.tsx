import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/features/auth/context/useAuth";

/**
 * Componente para proteger rotas que requerem autenticação
 * @returns Componente Outlet se o usuário estiver autenticado, ou redireciona para a página de login
 */
export default function RequireAuthRoute() {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    if (user?.role === "ALUNO" && location.pathname === "/") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
