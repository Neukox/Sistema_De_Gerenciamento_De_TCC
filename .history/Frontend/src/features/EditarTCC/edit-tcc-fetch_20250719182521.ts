import { updateTCC } from "../../services/tcc/update";
import type { ApiResponse } from "@/types/response/base";
import type { GetTCCResponse, UpdateTCCRequest } from "@/types/response/tcc";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useEditTCC() {
  const navigate = useNavigate();

  const mutation = useMutation<
    GetTCCResponse,
    AxiosError<ApiResponse>,
    { id: number; data: UpdateTCCRequest }
  >({
    mutationFn: ({ id, data }) => updateTCC(id, data),
    onSuccess: () => {
      toast.success(
        "TCC atualizado com sucesso!",
        {
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
      // Redirecionar para o dashboard após sucesso
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Erro ao atualizar TCC", {
        autoClose: 3000,
        hideProgressBar: false,
      });
    },
  });

  return {
    updateTCC: (id: number, data: UpdateTCCRequest) => mutation.mutate({ id, data }),
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
