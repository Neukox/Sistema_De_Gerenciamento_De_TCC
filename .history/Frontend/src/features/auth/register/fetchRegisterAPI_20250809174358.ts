import type { AuthResponse, RegisterRequest } from "@/types/response/auth";
import register from "@/services/auth/register";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";
import type { UserData } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/response/base";

/**
 * Hook para registrar um novo usuário.
 * Este hook fornece a funcionalidade de registro, incluindo o estado de carregamento e a função para registrar um usuário.
 * @return {Function} `registerUser` - Função para registrar um usuário com os dados fornecidos.
 * @return {boolean} `loading` - Estado que indica se a operação de registro está em andamento.
 */

export default function useRegister() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const mutation = useMutation<
    AuthResponse,
    AxiosError<ApiResponse>,
    RegisterRequest
  >({
    mutationFn: register,
    onSuccess: (data) => {
      setSession(data.usuario as UserData, data.token as string);
      toast.success("Registro realizado com sucesso!", {
        autoClose: 3000,
      });
      navigate("/boas-vindas");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Erro ao registrar usuário",
          {
            autoClose: 3000,
          }
        );
      } else {
        toast.error("Erro desconhecido ao registrar usuário", {
          autoClose: 3000,
        });
      }
    },
  });

  return { registerUser: mutation.mutate, loading: mutation.isPending };
}
