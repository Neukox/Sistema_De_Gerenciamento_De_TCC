import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/context/useAuth";
import { useTCCContext } from "@/hooks/useTCCContext";

export default function useAuthRedirect() {
  const { user } = useAuth();
  const { tccData } = useTCCContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.warn(
        "Usuário não autenticado, redirecionando para a página de login."
      );
      navigate("/login");
      return;
    }

    if (!tccData) {
      console.warn(
        "Dados do TCC não encontrados, redirecionando para Boas Vindas."
      );
      navigate("/boas-vindas");
      return;
    }

    if (user.role === "ALUNO" && tccData) {
      console.log("Usuário é ALUNO com TCC, redirecionando para Dashboard.");
      navigate("/maindashboard");
      return;
    }

    if (user.role === "PROFESSOR") {
      console.log("Usuário é PROFESSOR, redirecionando para Boas Vindas.");
      navigate("/boas-vindas");
      return;
    }

    if (user.role === "ADMIN") {
      console.log("Usuário é ADMIN, redirecionando para Boas Vindas.");
      navigate("/boas-vindas");
      return;
    }
  }, [user, tccData, navigate]);

  return null;
}
