import { toast } from "react-toastify";
import fetchResetPassword from "@/services/auth/reset-password";
import { isAxiosError } from "axios";
import type { ResetPasswordRequest } from "@/types/response/auth";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/response/base";

/**
 * Hook para gerenciar a redefinição de senha.
 * Fornece uma função para solicitar a redefinição de senha e um estado de carregamento.
 *
 * @returns {Object} - Objeto contendo a função `resetPassword` e o estado `loading`.
 */
export default function useResetPassword() {
  const mutation = useMutation<ApiResponse, Error, ResetPasswordRequest>({
    mutationFn: fetchResetPassword,
    onSuccess: () => {
      toast.success("Senha redefinida com sucesso!", {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Erro ao redefinir senha", {
          autoClose: 3000,
        });
      } else {
        toast.error("Erro desconhecido ao redefinir senha", {
          autoClose: 3000,
        });
      }
    },
  });

  return { resetPassword: mutation.mutate, loading: mutation.isPending };
}
