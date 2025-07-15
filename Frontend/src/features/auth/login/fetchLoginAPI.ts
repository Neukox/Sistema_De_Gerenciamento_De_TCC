import login from "../../../services/auth/login";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";
import type { UserData } from "@/types/user/user";

/**
 * Hook para realizar o login de um usuário.
 * Este hook fornece a funcionalidade de login, incluindo o estado de carregamento e a função para realizar o login.
 * @return {Function} `loginUser` - Função para realizar o login com email e senha.
 * @return {boolean} `loading` - Estado que indica se a operação de login está em andamento.
 */

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const loginUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        setSession(response.usuario as UserData, response.token as string);
        navigate("/maindashboard");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Erro ao realizar login");
      } else {
        toast.error("Erro desconhecido ao realizar login");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
}
