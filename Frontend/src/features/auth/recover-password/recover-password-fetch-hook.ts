import requestPasswordReset from "@/services/auth/recover-password";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/response/base";

/**
 * Hook para gerenciar a recuperação de senha.
 * Fornece uma função para solicitar a recuperação de senha e um estado de carregamento.
 *
 * @returns {Object} - Objeto contendo a função `recoverPassword` e o estado `loading`.
 */

export default function useRecoverPassword() {
  const mutation = useMutation<ApiResponse, AxiosError<ApiResponse>, string>({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success(
        "Instruções de recuperação de senha enviadas para o email.",
        {
          autoClose: 3000,
        }
      );
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Erro ao enviar email", {
          autoClose: 3000,
        });
      } else {
        toast.error("Erro desconhecido ao enviar email", {
          autoClose: 3000,
        });
      }
    },
  });

  return { recoverPassword: mutation.mutate, loading: mutation.isPending };
}
