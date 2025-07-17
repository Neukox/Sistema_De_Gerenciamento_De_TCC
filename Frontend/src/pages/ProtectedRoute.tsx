import useAuth from "@/features/auth/context/useAuth";
import { useTCCContext } from "@/hooks/useTCCContext";
import { Outlet, Navigate } from "react-router-dom";

/**
 * Componente para proteger rotas que requerem autenticação
 * @returns Componente Outlet se o usuário estiver autenticado, ou redireciona para a página de login
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { tccData } = useTCCContext();

  if (!isAuthenticated && import.meta.env.VITE_DEV_PROTECT_ROUTES === "true") {
    return <Navigate to="/login" replace />;
  }

  // Verifica se o usuário é um Aluno e se o TCC está definido
  if (user?.role === "ALUNO") {
    // Se o usuário for um Aluno e não tiver um TCC cadastrado, redireciona para Boas Vindas
    if (!tccData || !tccData.id) {
      return <Navigate to="/" replace />;
    }

    return <Navigate to="/maindashboard" replace />;
  }

  if (user?.role === "PROFESSOR") {
    // Se o usuário for um Professor, redireciona para Boas Vindas
    return <Navigate to="/" replace />;
  }

  // Se o usuário for um ADMIN, redireciona para o Dashboard Principal
  if (user?.role === "ADMIN") {
    return <Navigate to="/maindashboard" replace />;
  }

  // Se o usuário estiver autenticado, renderiza os componentes filhos
  return <Outlet />;
};

export default ProtectedRoute;
